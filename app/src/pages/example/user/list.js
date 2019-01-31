import {
  Badge,
  Button,
  Fab,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  AdminContext,
  Content,
  Link,
  TitleBar,
  ToolBar,
  Tools,
} from "django-bananas";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  root: {
    position: "relative",
  },
  addButton: {
    boxShadow: "none",
    paddingRight: theme.spacing.unit * 2,
  },
  addIcon: {
    marginRight: theme.spacing.unit,
  },
  users: {
    marginTop: theme.spacing.unit * 3,
  },
  userHover: {
    cursor: "pointer",
  },
  toolBarButton: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  evenToolbar: {
    "& > *": {
      width: "33%",
    },
  },
});

const UsersPage = ({ route, data, title, logger, classes }) => {
  const { query, hash } = route;
  logger.debug("Rendering users list with data:", data);
  return (
    <AdminContext.Consumer>
      {context => (
        <>
          <TitleBar title={title}>
            <Tools>
              <Link route="example.user:create">
                <Fab
                  color="secondary"
                  size="medium"
                  variant="extended"
                  className={classes.addButton}
                >
                  <PersonAddIcon className={classes.addIcon} /> Add
                </Fab>
              </Link>
              <Link route="example.user:create">
                <Fab
                  color="secondary"
                  size="medium"
                  variant="extended"
                  className={classes.addButton}
                >
                  <PersonAddIcon className={classes.addIcon} /> Add
                </Fab>
              </Link>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tools>
          </TitleBar>
          <TitleBar
            title="Filters"
            color="paper"
            border="bottom"
            dense
            overrides={{
              toolbar: classes.evenToolbar,
            }}
          >
            <Input placeholder={"Search..."} />
            <Tools>
              <IconButton color="inherit">
                <FilterListIcon />
              </IconButton>
            </Tools>
          </TitleBar>

          <Content contained={false}>
            <Typography>
              <strong>Route:</strong> {route.id}
            </Typography>
            <Typography>
              <strong>Query:</strong>{" "}
              {query &&
                Object.entries(query).map(
                  ([key, value]) => `${key} : ${value}, `
                )}
            </Typography>
            <Typography>
              <strong>Hash:</strong> {hash}
            </Typography>
            <Paper className={classes.users}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>E-mail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.obj.map(user => (
                    <Link
                      key={user.id}
                      route="example.user:read"
                      params={{ id: user.id }}
                    >
                      <TableRow classes={{ hover: classes.userHover }} hover>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                    </Link>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>
                      <strong>Count:</strong> {data.obj.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Content>
          <ToolBar color="primary" justify="center">
            <Tools>
              <Link path="/">
                <Button variant="text" className={classes.toolBarButton}>
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="text"
                className={classes.toolBarButton}
                onClick={() =>
                  context.router.route(
                    {
                      query: { username: "stormtrooper", age: "40" },
                    },
                    { patch: true }
                  )
                }
              >
                Add Query Param
              </Button>

              <Button
                variant="text"
                className={classes.toolBarButton}
                onClick={() =>
                  context.router.route({ hash: "olof" }, { patch: true })
                }
              >
                Add Hash
              </Button>

              <Button
                variant="text"
                className={classes.toolBarButton}
                onClick={() =>
                  context.router.route({ query: { foo: "bar" }, hash: "#baz" })
                }
              >
                Add Query and Hash
              </Button>

              <Button
                variant="text"
                className={classes.toolBarButton}
                onClick={async () => {
                  context.router.route("/foobar");
                }}
              >
                404
              </Button>

              <Button
                variant="text"
                className={classes.toolBarButton}
                onClick={async () => {
                  const me = await context.api["bananas.me:list"]();
                  logger.info("ME", me);
                  context.admin.info(`Fetched Me: ${me.obj.username}`);
                }}
              >
                API call
              </Button>
            </Tools>
          </ToolBar>
        </>
      )}
    </AdminContext.Consumer>
  );
};

UsersPage.propTypes = {
  route: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  logger: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersPage);

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
    paddingRight: theme.spacing(2),
  },
  addIcon: {
    marginRight: theme.spacing.unit,
  },
  users: {
    marginTop: theme.spacing(3),
  },
  userHover: {
    cursor: "pointer",
  },
  evenToolbar: {
    "& > *": {
      width: "33%",
    },
  },
});

class UsersPage extends React.Component {
  state = {};

  render() {
    const { route, data, title, logger, classes } = this.props;
    const { query, hash } = route;
    const { throwError } = this.state;

    logger.debug("Rendering users list with data:", data);

    if (throwError) {
      throw new Error("fail!");
    }

    return (
      <AdminContext.Consumer>
        {context => (
          <>
            <TitleBar title={title} color="primary">
              <Tools>
                <Link route="example.user:create">
                  <Fab
                    color="primary"
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
            <ToolBar color="paper" justify="center">
              <Tools>
                <Link path="/">
                  <Button variant="contained" color="primary">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    context.router.route(
                      {
                        query: { username: "stormtrooper", age: "40" },
                      },
                      { patch: true }
                    )
                  }
                >
                  Query Param
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    context.router.route({ hash: "olof" }, { patch: true })
                  }
                >
                  Hash
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    context.router.route({
                      query: { foo: "bar" },
                      hash: "#baz",
                    })
                  }
                >
                  Query and Hash
                </Button>

                <Button
                  variant="outlined"
                  onClick={async () => {
                    const me = await context.api["bananas.me:list"]();
                    logger.info("ME", me);
                    context.admin.info(`Fetched Me: ${me.obj.username}`);
                  }}
                >
                  API call
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    context.admin.alert({
                      title: "Do you want to do this?",
                      message: (
                        <React.Fragment>
                          Will do something that can not be undone.
                          <NotificationsIcon
                            fontSize="small"
                            color="secondary"
                          />
                        </React.Fragment>
                      ),
                      agree: "Okidokey!",
                      dismiss: "Nope",
                      onDismiss: () => context.admin.warning("Dismissed!"),
                      onAgree: () => context.admin.success("Agreed!"),
                    });
                  }}
                >
                  Alert
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    context.admin.confirm({
                      onDismiss: () => context.admin.warning("Dismissed!"),
                      onAgree: () => context.admin.success("Agreed!"),
                    });
                  }}
                >
                  Confirm
                </Button>

                <Button variant="contained">Default</Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={async () => {
                    context.router.route({ id: "example.user:form.read" });
                  }}
                >
                  Form
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={async () => {
                    context.router.route("/foobar");
                  }}
                >
                  404
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    this.setState({ throwError: true });
                  }}
                >
                  500
                </Button>
              </Tools>
            </ToolBar>
          </>
        )}
      </AdminContext.Consumer>
    );
  }
}

UsersPage.propTypes = {
  route: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  logger: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersPage);

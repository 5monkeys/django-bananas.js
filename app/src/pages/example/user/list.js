import {
  Badge,
  Box,
  Button,
  createStyles,
  Fab,
  IconButton,
  Input,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
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

const useStyles = makeStyles(
  createStyles(theme => ({
    root: {
      position: "relative",
    },
    addButton: {
      boxShadow: "none",
      paddingRight: theme.spacing(2),
    },
    addIcon: {
      marginRight: theme.spacing(1),
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
    spacedContent: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  }))
);

const UsersPage = ({ route, data, title, logger }) => {
  const { query, hash } = route;
  const [error, setError] = React.useState(false);
  const classes = useStyles();

  logger.debug("Rendering users list with data:", data);

  if (error) {
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
            <Paper className={classes.users} elevation={2}>
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
            <Box className={classes.spacedContent} marginTop={3}>
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
                      <>
                        Will do something that can not be undone.
                        <NotificationsIcon fontSize="small" color="secondary" />
                      </>
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
                  setError(true);
                }}
              >
                500
              </Button>
            </Box>
            <Box marginTop={3}>
              <Typography variant="h5">Try out with one more box...</Typography>
              <Typography variant="body1">
                ...To really see how the scroll works.
              </Typography>
            </Box>
            <Box marginTop={3}>
              <Typography variant="h5">Try out with one more box...</Typography>
              <Typography variant="body1">
                ...To really see how the scroll works.
              </Typography>
            </Box>
            <Box marginTop={3}>
              <Typography variant="h5">Try out with one more box...</Typography>
              <Typography variant="body1">
                ...To really see how the scroll works.
              </Typography>
            </Box>
            <Box marginTop={3}>
              <Typography variant="h5">Try out with one more box...</Typography>
              <Typography variant="body1">
                ...To really see how the scroll works.
              </Typography>
            </Box>
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
};

export default UsersPage;

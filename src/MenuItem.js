import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Link from "./Link";

const styles = theme => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    transition: theme.transitions.create("min-height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  // Classes for states
  selected: {},
  expanded: {},
  collapsed: {},
  wide: {},
  dense: {},

  leftAligned: {},
  rightAligned: {
    // Reverse order of avatar and label
    flexDirection: "row-reverse",
    textAlign: "right",
  },

  multiline: {
    "& *": {
      // Label with multiple lines (priamry and secondary)
      lineHeight: 1.2,
    },

    "& $icon": {
      // Large Icon to span multiple lines
      width: 40,
      height: 40,
      fontSize: 40,
    },
  },

  drawerVariant: {
    "&$leftAligned": {
      paddingLeft: 0,
    },
    "&$rightAligned": {
      paddingRight: 0,
    },
    "&$wide": {
      // Wide outer height
      minHeight: 40 + theme.spacing(1),

      "& $avatarItem": {
        // Expanded avatar wrapper width, with centered Avatar
        width: 40 + theme.spacing(3),
      },
      "&$collapsed $avatarItem": {
        // Collapsed avatar wrapper width, with centered Avatar
        width: 40 + theme.spacing(2),
      },
    },
    "&$dense": {
      // Dense outer height
      minHeight: 24 + theme.spacing(1),

      "& $avatarItem": {
        // Avatar wrapper width, with centered Avatar
        width: 40 + theme.spacing(2),
      },
    },
    "&$expanded $labelItem": {
      opacity: 1.0, // Fade label when expanding
    },
    "&$collapsed $labelItem": {
      opacity: 0.0, // Fade label when collapsing
    },
    "& $labelInset:first-child": {
      // Outermost left edge padding when icons disabled
      paddingLeft: theme.spacing(3),
    },
  },

  appbarVariant: {
    "&$wide": {
      ...theme.mixins.toolbar,
    },
    "&$dense": {
      minHeight: 36,

      "&$leftAligned": {
        // Outermost edge padding
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
    },
    "&$leftAligned": {
      // Outermost edge padding
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      "& $avatarItem": {
        // Padding between avatar and label
        marginRight: theme.spacing(1),
      },
    },
    "&$rightAligned": {
      // Outermost edge padding
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(3),

      "& $avatarItem": {
        // Padding between avatar and label
        marginLeft: theme.spacing(1),
      },
    },
    "& $labelInset:first-child": {
      // Outermost left edge padding when icons disabled
      paddingLeft: 0,
    },
    "& $label": {
      color: theme.palette.primary.contrastText,
    },
    "& $subtitle": {
      color: theme.palette.primary.contrastText,
      "& > *": {
        opacity: 0.54,
      },
    },
    "& $icon": {
      color: theme.palette.primary.contrastText,
    },
    "& $avatar": {
      color: theme.palette.primary.contrastText,
    },
  },

  avatarItem: {
    // Avatar wrapper for flexing
    flexShrink: 0,
    flexGrow: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "inherit",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  labelItem: {
    // Text label wrapper for flexing
    flexShrink: 1,
    flexGrow: 0,
    padding: 0,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  label: {
    // Text label Typography element
    color: theme.palette.text.primary,
    transition: theme.transitions.create(["font-size"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  subtitle: { color: theme.palette.text.secondary },
  labelInset: {}, // Class for inset padding when icons disabled

  avatar: {
    // Avatar element, circle or transparent depending on child
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    fontSize: 24,
    margin: 0,
    width: "auto",
    height: "auto",
    transition: theme.transitions.create(["width", "height", "font-size"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  listItemAvatarRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  char: {
    // Circle Avatar variant with first letter of label
    backgroundColor: theme.palette.action.selected,
    fontSize: "inherit",
    width: 36,
    height: 36,
  },
  charDense: {
    // Dense version of circle avatar
    fontSize: "0.9em",
    width: 24,
    height: 24,
  },

  icon: {
    // Icon element, child of Avatar
    marginRight: 0,
    fontSize: "inherit",
    color: theme.palette.text.primary,
    opacity: 0.666,
    transition: theme.transitions.create(["width", "height", "font-size"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

const MenuItem = ({
  classes,
  route,
  title,
  subtitle,
  variant,
  icon,
  selected,
  collapsed,
  dense,
  direction,
}) => {
  const ItemIcon = icon;
  const showIcon = ItemIcon !== null;
  const isIconDefined = showIcon && Boolean(ItemIcon);

  const isDrawerVariant = variant === "drawer";
  const isAppBarVariant = variant === "appbar";

  const isLtR = direction === "ltr";
  const isRtL = direction === "rtl";

  const isMultiLine = Boolean(subtitle);

  return (
    <Link route={route}>
      <ListItem
        className={classNames(classes.root, {
          [classes.drawerVariant]: isDrawerVariant,
          [classes.appbarVariant]: isAppBarVariant,
          [classes.leftAligned]: isLtR,
          [classes.rightAligned]: isRtL,
          [classes.expanded]: !collapsed,
          [classes.collapsed]: collapsed,
          [classes.dense]: dense,
          [classes.wide]: !dense,
          [classes.multiline]: isMultiLine,
          [classes.selected]: selected,
        })}
        dense={dense || isMultiLine}
        selected={selected}
        button
      >
        {showIcon && (
          <div className={classes.avatarItem} data-testid="MenuItemIcon">
            <ListItemAvatar classes={{ root: classes.listItemAvatarRoot }}>
              <Avatar
                classes={{
                  root: classNames(classes.avatar, {
                    [classes.char]: !isIconDefined,
                    [classes.charDense]:
                      !isIconDefined && dense && !isMultiLine,
                  }),
                }}
              >
                {isIconDefined ? (
                  <ItemIcon className={classes.icon} />
                ) : (
                  title.substring(0, 1)
                )}
              </Avatar>
            </ListItemAvatar>
          </div>
        )}
        <ListItemText
          classes={{
            root: classes.labelItem,
            primary: classes.label,
            secondary: classes.subtitle,
            inset: classes.labelInset,
          }}
          inset={!showIcon}
          primaryTypographyProps={{ noWrap: true }}
          secondaryTypographyProps={{ noWrap: true }}
          primary={title}
          secondary={subtitle}
          data-testid="MenuItemText"
        />
      </ListItem>
    </Link>
  );
};

MenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  variant: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
  dense: PropTypes.bool,
  selected: PropTypes.bool,
  collapsed: PropTypes.bool,
  direction: PropTypes.string,
};

MenuItem.defaultProps = {
  variant: "drawer", // drawer|appbar
  subtitle: undefined,
  icon: undefined,
  dense: false,
  selected: false,
  collapsed: false,
  direction: "ltr", // ltr | rtl
};

export default withStyles(styles, { name: "BananasMenuItem" })(MenuItem);

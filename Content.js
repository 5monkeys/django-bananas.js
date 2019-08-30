"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("./Container"));

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = _jsLogger.default.get("bananas");

var styles = theme => ({
  root: {
    position: "relative",
    flexGrow: 1
  },
  scroll: {
    position: "absolute",
    overflowY: "auto",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  padded: {
    padding: theme.spacing(3)
  }
});

class Content extends _react.default.Component {
  constructor(props) {
    super(props);
    this.scrollElement = _react.default.createRef();
  }

  componentDidMount() {
    var router = this.context ? this.context.router : null;

    if (router) {
      // Listen to routeWillUpdate event to persist current scroll position
      this.unlisten = router.on("routeWillUpdate", this.routeWillUpdate.bind(this)); // Restore scroll position from history state

      var {
        scroll
      } = router.history.location.state;
      var {
        current
      } = this.scrollElement;

      if (current && scroll) {
        logger.debug("Restoring scroll position:", scroll);
        current.scrollTop = scroll;
      }
    }
  }

  componentWillUnmount() {
    // Unlisten to routeWillUpdate event
    if (this.unlisten) {
      this.unlisten();
    }
  }

  routeWillUpdate(location, action) {
    /*
     * Persist current scroll position, if element is scrolled.
     */
    var router = this.context ? this.context.router : null;

    if (!router || action === "REPLACE") {
      return;
    }

    var {
      current
    } = this.scrollElement;
    var oldScroll = router.history.location.state.scroll;

    if (current && (current.scrollTop > 0 || current.scrollTop !== oldScroll)) {
      var {
        scrollTop
      } = current;
      logger.debug("Updating history with scroll position:", scrollTop);
      router.updateState({
        scroll: scrollTop
      });
    }
  }

  render() {
    var _this$props = this.props,
        {
      classes,
      children,
      disablePadding,
      contained
    } = _this$props,
        rest = _objectWithoutProperties(_this$props, ["classes", "children", "disablePadding", "contained"]);

    return _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.root)
    }, _react.default.createElement("div", {
      ref: this.scrollElement,
      className: classes.scroll
    }, contained ? _react.default.createElement(_Container.default, null, _react.default.createElement("div", _extends({
      className: (0, _classnames.default)({
        [classes.padded]: !disablePadding
      })
    }, rest), children)) : _react.default.createElement("div", _extends({
      className: (0, _classnames.default)({
        [classes.padded]: !disablePadding
      })
    }, rest), children)));
  }

}

_defineProperty(Content, "contextType", _context.default);

Content.propTypes = {
  classes: _propTypes.default.object.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node, _propTypes.default.string]),
  disablePadding: _propTypes.default.bool,
  contained: _propTypes.default.bool
};
Content.defaultProps = {
  children: null,
  disablePadding: false,
  contained: true
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasContent"
})(Content);

exports.default = _default;
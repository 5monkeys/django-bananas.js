import { SvgIcon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  gInner: {
    fill: theme.palette.primary.contrastText,
  },
  g: {
    strokeWidth: "1",
    fillRule: "evenodd",
    fill: "none",
    stroke: "none",
  },
  imgLogo: {
    height: 36,
  },
  bananas: {
    fill: theme.palette.primary.contrastText,
  },
});

const Logo = ({ src, classes }) => {
  if (src === true) {
    return (
      <SvgIcon
        height="32"
        viewBox="0 0 927.611 927.611"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m158.56 618.97 2.4-.7c97-26.199 181.6-59.8 251.2-99.8 94.5-54.3 159.4-119.5 193-193.799l16-35.4-28.699 26.2c-57 52.1-134.801 91-231.4 115.8-81.9 21-176 31.7-279.8 31.7-5.4 0-17.4-.1-24.6-.2l-16.9-.8c-13.3-.6-25.4 7.6-29.8 20.2l-6.6 19.1c-3.9 11.301-.7 23.9 8.2 32 7.4 6.7 14.9 13.2 14.9 13.2s56 48.5 129.6 71.7z" />
        <path d="m811.86 163.17c-29.1-13.4-56.899-15.4-70.899-15.4-1.801 0-3.5 0-4.9.1-3.2-11.2-19.4-78.1-30.7-124.9-5.2-21.5-31.1-30.2-48.2-16.1l-53.6 44.2c-14 11.5-16.9 31.7-6.7 46.7 22.4 32.9 59.5 91.7 77.7 144.8 17.2 50.3 18.7 102.9 10.5 154.6-13.4 83.7-57.6 168.2-131.4 251.2-40.199 45.2-84.699 86.399-132.199 123.7-23.801 18.699-48.4 36.399-73.7 53-2.601 1.699-32.7 19.399-53.601 30.199-11.699 6-18.1 19-15.8 31.9l2.5 14c2.4 13.4 13.5 23.5 27 24.6 34.3 2.9 105.101 4.801 199.7-13.899 51.8-10.2 101.8-34.5 148.2-62.101 78.1-46.6 182.8-131.399 238.1-271 24.7-62.3 35.2-126.699 31.2-191.599-3.9-63.8-20.7-112.4-34.1-142-17.301-38.399-43.901-65.899-79.101-82z" />
        <path d="m109.46 744.97c13.1 8.101 34.4 19.8 60.3 28.4 44.5 14.8 91.8 21.2 138.5 22.7l2.6.1 2.101-1.4c34.5-23.1 67.3-47.3 97.6-71.899 37.7-30.7 71.5-62.2 100.5-93.601 26.3-28.5 50.6-58.899 71.4-91.6 18.199-28.6 33.699-59.1 44.8-91.2 5.2-15 9.5-30.399 12.399-46.1 3-15.9 4.4-32.1 6.5-48.2.4-3.2.801-6.3 1.2-9.5l-19.899 33.9c-41.7 71.199-110.5 133.699-204.601 186-61.2 34.1-126.8 60.1-193.6 81.199-36.4 11.5-71.6 21.601-108.6 27.301-14.6 2.199-25.3 14.8-25.3 29.6v18.9c0 10.3 5.3 19.9 14.1 25.4z" />
      </SvgIcon>
    );
  } else if (typeof src === "string") {
    return <img className={classes.imgLogo} src={src} />;
  } else if (src) {
    return src;
  }

  return null;
};

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
};

Logo.defaultProps = {
  src: null,
};

export default withStyles(styles)(Logo);

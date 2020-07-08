import React, { ReactElement } from 'react';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';

interface Props {
  
}

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black,
    //color: "orange",
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    //backgroundColor: "orange",
    //color: theme.palette.common.white,
  },
}));

function BootstrapTooltip(props: TooltipProps): ReactElement {
  const classes = useStylesBootstrap();

  return (
    <Tooltip arrow classes={classes} {...props} />
  )
}

export default BootstrapTooltip

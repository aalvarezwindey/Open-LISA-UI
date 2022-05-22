import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';

let tooltipTimer;
const DEFAULT_TOOLTIP_TIME = 3000;

function InfoTooltip({ children, time, tooltipProps, ...rest }) {
  useEffect(() => () => tooltipTimer ? clearTimeout(tooltipTimer) : null, []);
  const [openTooltip, setOpenTooltip] = useState(false);

  const onTooltipClick = () => {
    setOpenTooltip(true);
    tooltipTimer = setTimeout(() => setOpenTooltip(false), time);
  };

  return (
    <Tooltip {...tooltipProps} hasArrow label={children} isOpen={openTooltip}>
      <InfoIcon {...rest} onClick={onTooltipClick} cursor="pointer" />
    </Tooltip>
  );
}

InfoTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  time: PropTypes.number,
  tooltipProps: PropTypes.object,
};

InfoTooltip.defaultProps = {
  tooltipProps: {},
  time: DEFAULT_TOOLTIP_TIME,
};

export default InfoTooltip;

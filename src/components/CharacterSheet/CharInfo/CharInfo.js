import React from 'react';

import Box from '../../../hoc/Box/Box';
import './CharInfo.css';

const charInfo = props => {
  let classType;

  switch (props.charClass) {
    case 'brute':
      classType = 'Inox Brute';
      break;
    case 'spellweaver':
      classType = 'Orchid Spellweaver';
      break;
    case 'cragheart':
      classType = 'Savaas Cragheart';
      break;
    case 'scoundrel':
      classType = 'Human Scoundrel';
      break;
    case 'mindthief':
      classType = 'Vermling Mindthief';
      break;
    case 'tinkerer':
      classType = 'Quatryl Tinkerer';
      break;
    default:
      classType = 'Inox Brute';
  }

  return (
    <Box extraClasses={props.styles + ' ' + props.charClass}>
      <div className="ClassName">
        <h2 className="title">
          {props.charName && props.charName + ' the '}
          {!props.charName && 'Anonymous '}
          {classType}
        </h2>
      </div>
    </Box>
  );
};

export default charInfo;

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Icon from './Icon';
import { colors, lengths, buttons } from './styles';

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 0px;
  border-radius: ${lengths.borderRadius} ${lengths.borderRadius} 0 0;
  position: relative;
  background: #e1ddec;
`;

const TopBarButton = styled.button`
  ${buttons.button};
  color: ${colors.controlLabel};
  background: transparent;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  width: 32px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &:hover{
    background: #e1ddec;
  }
`;

const TopBarButtonSpan = TopBarButton.withComponent('span');
const DragIconContainer = styled(TopBarButtonSpan)`
  cursor: move;
  height: 100%;
  &:hover{
    background: #e1ddec;
  }
`;

function DragHandle({ dragHandleHOC }) {
  const Handle = dragHandleHOC(() => (
    <DragIconContainer>
      <Icon type="drag-handle" size="small" />
    </DragIconContainer>
  ));
  return <Handle />;
}

function ListItemTopBar({ className, collapsed, onCollapseToggle, onRemove, dragHandleHOC, item }) {
  return (
    item?.props?.collapsed
      ?
      <TopBar className={className}>
        {dragHandleHOC ? <DragHandle dragHandleHOC={dragHandleHOC} /> : null}
        {item}
        {onRemove ? (
          <TopBarButton onClick={onRemove}>
            <Icon type="close" size="small" />
          </TopBarButton>
        ) : null}
      </TopBar>
      :
      <TopBar />
  );
}

ListItemTopBar.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  onCollapseToggle: PropTypes.func,
  onRemove: PropTypes.func,
};

const StyledListItemTopBar = styled(ListItemTopBar)`
  display: flex;
  min-height: 50px;
  align-items: center;
  justify-content: space-around
  border-radius: ${lengths.borderRadius} ${lengths.borderRadius} 0 0;
  position: relative;
`;

export default StyledListItemTopBar;

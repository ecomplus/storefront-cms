import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Wrapper, Button as DropdownButton, Menu, MenuItem } from 'react-aria-menubutton';

import { colors, buttons, components, zIndex } from './styles';
import Icon from './Icon';

const StyledWrapper = styled(Wrapper)`
  position: relative;
  font-size: 14px;
  user-select: none;
`;
const StyledBoxDropdownV2 = styled.div`
  min-width: 192px;
  border-radius: var(--tina-radius-big);
  border: 1px solid rgb(239, 239, 239);
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate3d(0px, 0px, 0px) scale3d(0.5, 0.5, 1);
  opacity: 0;
  pointer-events: none;
  transition: all 1150ms ease-out 0s;
  transform-origin: 100% 0px;
  box-shadow: var(--tina-shadow-big);
  background-color: white;
  overflow: hidden;
  z-index: var(--tina-z-index-1);
`;
const StyledButtonV2 = styled.button`
  @keyframes bounce {
    0%, 20%, 60%, 100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
    }
    80% {
      -webkit-transform: translateY(-3px);
      transform: translateY(-3px);
    }
  }
  border: none;
  padding: 10px;
  margin: 0;
  position: relative;
  line-height: 2px;
  border-radius: 100px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  background: #b2adbe;
  &:hover{
    animation: bounce 400ms
  }
`;

const StyledDropdownButtonV2 = styled(DropdownButton)`
  ${buttons.button};
  ${buttons.default};
  display: block;
  padding-left: 20px;
  padding-right: 40px;
  position: relative;
  -webkit-transition: -webkit-transform 1s
  &:after {
    ${components.caretDown};
    content: '';
    display: block;
    position: absolute;
    top: 16px;
    right: 10px;
    color: currentColor;
  }
`;
const StyledDropdownButton = styled(DropdownButton)`
  ${buttons.button};
  ${buttons.default};
  display: block;
  padding-left: 20px;
  padding-right: 40px;
  position: relative;
  &:after {
    ${components.caretDown};
    content: '';
    display: block;
    position: absolute;
    top: 16px;
    right: 10px;
    color: currentColor;
  }
`;
const DropdownList = styled.div`
  ${components.dropdownList};
  border: 1px solid rgb(239, 239, 239);
  position: absolute;
  top: 35px;
  min-width: 100px;
  z-index: ${zIndex.zIndex299};
  right: 20px;
  border-radius: 24px;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1);
  box-sizing: border-box;
`;

function StyledMenuItem({ isActive, isCheckedItem = false, ...props }) {
  return (
    <MenuItem
      css={css`
        ${components.dropdownItem};
        &:focus,
        &:active,
        &:not(:focus),
        &:not(:active) {
          background-color: ${isActive ? colors.activeBackground : 'inherit'};
          color: ${isActive ? colors.active : 'inherit'};
          ${isCheckedItem ? 'display: flex; justify-content: start' : ''};
        }
        &:hover {
          color: ${colors.active};
          background-color: ${colors.activeBackground};
        }
        &.active {
          text-decoration: underline;
        }
      `}
      {...props}
    />
  );
}

const MenuItemIconContainer = styled.div`
  flex: 1 0 32px;
  text-align: right;
  position: relative;
  top: ${props => (props.iconSmall ? '0' : '2px')};
`;

function Dropdown({
  closeOnSelection = true,
  renderButton,
  dropdownWidth = 'auto',
  dropdownPosition = 'left',
  dropdownTopOverlap = '0',
  className,
  children,
}) {
  return (
    <StyledWrapper
      closeOnSelection={closeOnSelection}
      onSelection={handler => handler()}
      className={className}
    >
      {renderButton()}
      <Menu>
        <DropdownList width={dropdownWidth} top={dropdownTopOverlap} position={dropdownPosition}>
          {children}
        </DropdownList>
      </Menu>
    </StyledWrapper>
  );
}

Dropdown.propTypes = {
  renderButton: PropTypes.func.isRequired,
  dropdownWidth: PropTypes.string,
  dropdownPosition: PropTypes.string,
  dropdownTopOverlap: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

function DropdownItem({ label, icon, iconDirection, iconSmall, isActive, onClick, className }) {
  return (
    <StyledMenuItem value={onClick} isActive={isActive} className={className}>
      <span>{label}</span>
      {icon ? (
        <MenuItemIconContainer iconSmall={iconSmall}>
          <Icon type={icon} direction={iconDirection} size={iconSmall ? 'xsmall' : 'small'} />
        </MenuItemIconContainer>
      ) : null}
    </StyledMenuItem>
  );
}

DropdownItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  iconDirection: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

function StyledDropdownCheckbox({ checked, id }) {
  return (
    <input
      readOnly
      type="checkbox"
      css={css`
        margin-right: 10px;
      `}
      checked={checked}
      id={id}
    />
  );
}

function DropdownCheckedItem({ label, id, checked, onClick }) {
  return (
    <StyledMenuItem isCheckedItem={true} isActive={checked} onClick={onClick}>
      <StyledDropdownCheckbox checked={checked} id={id} />
      <span htmlFor={id}>{label}</span>
    </StyledMenuItem>
  );
}

DropdownCheckedItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export {
  Dropdown as default,
  DropdownItem,
  DropdownCheckedItem,
  DropdownButton,
  StyledDropdownButton,
  StyledDropdownButtonV2,
  StyledButtonV2,
  StyledBoxDropdownV2
};

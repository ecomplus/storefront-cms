import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Icon from './Icon';
import { colors, buttons } from './styles';
import Dropdown, { StyledDropdownButton, DropdownItem, StyledDropdownButtonV2, StyledButtonV2, StyledBoxDropdownV2 } from './Dropdown';
import { Button as DropdownButton } from 'react-aria-menubutton';

const TopBarContainer = styled.div`
  align-items: center;
  background-color: ${colors.textFieldBorder};
  display: flex;
  justify-content: space-between;
  margin: 0 -14px;
  padding: 13px;
`;

const ExpandButtonContainer = styled.div`
  ${props =>
    props.hasHeading &&
    css`
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
    `};
`;

const ExpandButton = styled.button`
  ${buttons.button};
  padding: 4px;
  background-color: transparent;
  color: inherit;

  &:last-of-type {
    margin-right: 4px;
  }
`;

const BackButton = styled.button`
  ${buttons.button};
  display: flex;
  align-items: center;
  justify-content: left
  background-color: transparent;
  color: inherit;
  width: 100%;
`;

const DivDropdownButtons = styled.div`
	border-radius: 10px;
  border: 1px solid rgb(239, 239, 239)
  transition: all 150ms ease-out 0s;
  background-color: white;
  overflow: visible;
`;

const DropdownButtons = styled.button`
  border: none;
  border-bottom: 1px solid rgb(239, 239, 239);
  background: none;
  cursor: pointer;
  padding: 12px;
  position: relative;
  text-align: center;
  width: 100%;

  &:hover{
    background-color: #f6f6f9
  }
`;
const DivIntDropdownButtons = styled.div`
  display: flex;
  flex-direction: column;
`;


const AddButton = styled.button`
  ${buttons.button}
  ${buttons.widget}

  ${Icon} {
    margin-left: 6px;
  }
`;

class ObjectWidgetTopBar extends React.Component {
  static propTypes = {
    allowAdd: PropTypes.bool,
    types: ImmutablePropTypes.list,
    onAdd: PropTypes.func,
    onAddType: PropTypes.func,
    onCollapseToggle: PropTypes.func,
    collapsed: PropTypes.bool,
    heading: PropTypes.node,
    label: PropTypes.string,
    t: PropTypes.func.isRequired,
    collapsedItem: PropTypes.string,
    itemsCollapsed: PropTypes.func,
  };

  renderAddUI() {
    if (!this.props.allowAdd) {
      return null;
    }
    if (this.props.types && this.props.types.size > 0) {
      return this.renderTypesDropdown(this.props.types);
    } else {
      return this.renderAddButton();
    }
  }
  renderTypesDropdown(types) {

    return (
      this.props.collapsedItem != ''
        ?
        <BackButton onClick={() => this.props.itemsCollapsed()}>
          <Icon type="chevron" size="small" direction='left' />
          <span style={{ marginLeft: '5px' }}>{this.props.collapsedItem}</span>
        </BackButton>
        :
        <Dropdown
          renderButton={() => (
            <StyledButtonV2>
              <DropdownButton>
                <Icon type="add" size="xsmall" />
              </DropdownButton>
            </StyledButtonV2>
          )}
        >
          <DivDropdownButtons>
            <DivIntDropdownButtons>
              {types.map((type, idx) => (
                <DropdownButtons key={idx} onClick={() => this.props.onAddType(type.get('name'))}>
                  {type.get('label', type.get('name'))}
                </DropdownButtons>
              ))}
            </DivIntDropdownButtons>
          </DivDropdownButtons>
        </Dropdown>
    );
  }

  renderAddButton() {
    return (
      <AddButton onClick={this.props.onAdd}>
        {this.props.t('editor.editorWidgets.list.add', { item: this.props.label })}
        <Icon type="add" size="xsmall" />
      </AddButton>
    );
  }

  render() {
    const { onCollapseToggle, collapsed, heading = null } = this.props;

    return (
      <TopBarContainer>
        <ExpandButtonContainer hasHeading={!!heading}>
        </ExpandButtonContainer>
        {this.renderAddUI()}
      </TopBarContainer>
    );
  }
}

export default ObjectWidgetTopBar;

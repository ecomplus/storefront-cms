import React, { useState, useEffect } from 'react';
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
    props?.hasHeading &&
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
const DivDropdownButtons = styled.ul`
  flex-wrap: wrap;
  -webkit-box-align: start;
  display: flex;
  align-items: flex-start;
  align-content: start;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  align-items: normal;
`;
const Drop = styled.div`
  z-index: 1;
  position: absolute;
  top: 50px;
  right: 10px;
  left: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid rgb(239, 239, 239);
  overflow: visible;
  box-shadow: 10px 5px 8px #dbdbdb;
  transition: all 600ms ease-out 0s;
`;
const DropdownButtons = styled.button`
  min-width: 100px;
  max-width: 100%;
  flex: 1;
  position: relative;
  padding: 10px;
  align-items: center;
  text-align: center;
  border: none;
  border-bottom: 1px solid rgb(239, 239, 239);
  background: none;
  cursor: pointer;
  text-align: center;

  overflow: hidden;
  -moz-transition: all 0.3s;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;

  &:hover{
    background-color: #f6f6f9;
    -moz-transform: scale(1.1);
	  -webkit-transform: scale(1.1);
	  transform: scale(1.1);
  }
`;
const DivIntDropdownButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IconFile = styled.div`
  background-image: url(${props => props?.src});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  max-width: 40px;
  max-height: 40px;
  min-width: 40px;
  min-height: 40px;
  margin: 5px auto;
`;
const LabelP = styled.p`
  margin: 0;
  font-size: 13px;
`
const AddButton = styled.button`
  ${buttons.button}
  ${buttons.widget}

  ${Icon} {
    margin-left: 6px;
  }
`;

const ObjectWidgetTopBar = ({
  onCollapseToggle,
  collapsed = null,
  heading = null,
  allowAdd = null,
  types = null,
  onAdd = null,
  onAddType = null,
  label = null,
  collapsedItem = null,
  itemsCollapsed = null,
  t = null,
}) => {

  const [dropBotton, setDropBotton] = useState(false)
  const [typesLabel, setTypesLabel] = useState([])

  useEffect(() => {
    let listMajor = []
    let listMinor = []
    if (types) {
      types.map((type, idx) => {
        const label = `${type?.get('label', type?.get('name')).toString()}`
        listMinor.push(`${label.substr(0, 13)}..`)
        listMajor.push(label)
      })
      setTypesLabel({ listMinor, listMajor, list: listMinor })
    }
  }, [])

  const zoomInLabel = (i) => {
    let listZoom = [...typesLabel.listMinor]
    listZoom[i] = typesLabel.listMajor[i]
    setTypesLabel({ ...typesLabel, list: listZoom })
  }

  const zoomOutLabel = (i) => {
    setTypesLabel({ ...typesLabel, list: typesLabel.listMinor })
  }

  const renderAddUI = () => {
    if (!allowAdd) return null
    return renderTypesDropdown(types);
  }
  const renderTypesDropdown = (types) => {

    return (
      collapsedItem != ''
        ?
        <BackButton onClick={() => itemsCollapsed()}>
          <Icon type="chevron" size="small" direction='left' />
          <span style={{ marginLeft: '5px' }}>{collapsedItem}</span>
        </BackButton>
        :
        <>
          <StyledButtonV2 onClick={() => types && types.size > 0 ? setDropBotton(!dropBotton) : onAdd()}>
            <Icon type="add" size="xsmall" />
          </StyledButtonV2>
          {dropBotton &&
            <Drop>
              <DivDropdownButtons>
                {types.map((type, idx) => (
                  <DropdownButtons key={idx} onClick={() => { onAddType(type?.get('name')); setDropBotton(!dropBotton) }}
                    onMouseEnter={() => zoomInLabel(idx)}
                    onMouseLeave={() => zoomOutLabel(idx)}>
                    {type?.get('icon', type?.get('icon'))
                      && <IconFile src={type?.get('icon', type?.get('icon')).toString()} />}
                    <LabelP>{typesLabel.list[idx]}</LabelP>
                  </DropdownButtons>
                ))}
              </DivDropdownButtons>
            </Drop>
          }
        </>
    );
  }

  const renderAddButton = () => {
    return (
      <AddButton onClick={onAdd}>
        {t('editor.editorWidgets.list.add', { item: label })}
        <Icon type="add" size="xsmall" />
      </AddButton>
    );
  }

  return (
    <TopBarContainer>
      <ExpandButtonContainer hasHeading={heading}>
      </ExpandButtonContainer>
      {renderAddUI()}
    </TopBarContainer>
  );
}

export default ObjectWidgetTopBar;

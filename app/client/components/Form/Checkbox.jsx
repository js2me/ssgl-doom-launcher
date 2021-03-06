import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import Label from './Label';

const LabelStyle = styled(Label)`
  display: inline-block;
  margin-left: 10px;
`;

const CheckboxStyle = styled.button`
  background: ${styles.button.back};
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  text-shadow: ${styles.button.shadow};
  border-radius: ${styles.border.radius};
  text-transform: uppercase;
  cursor: pointer;
  min-width: 0;
  height: 25px;
  width: 24px;
  padding: 2px 2px 5px 1px;

  svg {
    transition: ${styles.transition.short};
    stroke: ${styles.button.idle};
    transform: scale(0);
    width: 20px;
  }

  &.active svg {
    transform: scale(1);
  }

  &:hover {
    border: 1px solid ${styles.border.active};
    text-shadow: ${styles.font.glow};
  }

  &:hover svg {
    filter: ${styles.svg.glow};
    stroke: ${styles.color.active};
  }
`;

const Checked = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.00003L11 11"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.00003 11L11 1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Checkbox = ({ label, value, onChange, name, ...rest }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => setChecked(value), [value]);

  const onChangeWrap = () => {
    setChecked(!checked);
    onChange({ name, value: !checked });
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <CheckboxStyle
        type="button"
        {...rest}
        className={checked === true ? 'active' : undefined}
        onClick={onChangeWrap}
      >
        <Checked />
      </CheckboxStyle>
      <LabelStyle htmlFor={name}>{label}</LabelStyle>
      <input type="hidden" name={name} value={checked} />
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool
};

export default Checkbox;

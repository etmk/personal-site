import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { animated, useSpring } from 'react-spring'

import { Moon, Sun } from './Icons'

const track = css`
  box-sizing: content-box;
  background-color: #000;
  border-radius: 5rem;
  align-items: center;
  justify-content: space-around;
  display: inline-flex;
  padding: 2px;
  position: relative;
  height: 1.5rem;
  width: 3.5rem;
`

const Thumb = styled.span`
  display: block;
  background-color: #fff;
  border-radius: 100%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 1.5rem;
  width: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
`

const input = css`
  appearance: none;
  background: none;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
  width: 0;
  height: 0;
  outline: none;

  &:focus + ${Thumb} {
    box-shadow: 0 0 2px 3px var(--accent-colour);
  }

  &:checked + ${Thumb} {
    transform: translateX(2rem);
  }
`

const icon = css`
  color: #fff;
  display: block;
  height: 100%;
  padding: 0.2rem;
  width: 50%;

  > svg {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }
`

export default function ThemeSwitcher({ onChange, checked, ...props }) {
  const spring = useSpring({
    config: { mass: 1, tension: 120, friction: 14 },
    delay: 200,
    opacity: 1,
    from: { opacity: 0 },
  })

  return (
    <animated.label
      css={track}
      style={spring}
      htmlFor="toogleSwitch"
      aria-label={`Switch to ${checked ? 'light' : 'dark'}`}
    >
      <input
        type="checkbox"
        id="toogleSwitch"
        onChange={onChange}
        checked={checked}
        css={input}
        {...props}
      />
      <Thumb />
      <span css={icon} aria-hidden>
        <Moon />
      </span>
      <span css={icon} style={{ color: '#ffc107' }} aria-hidden>
        <Sun />
      </span>
    </animated.label>
  )
}

ThemeSwitcher.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}

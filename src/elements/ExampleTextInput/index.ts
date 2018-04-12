import styled from 'styled-components';

// required due to typescript definitions bug
import {
  SVGProps,
  HTMLAttributes,
  ClassAttributes,
  InputHTMLAttributes,
} from 'react';
export { SVGProps, HTMLAttributes, ClassAttributes, InputHTMLAttributes };
import { StyledComponentClass } from 'styled-components';
export { StyledComponentClass };

export interface ExampleTextInputProps {
  id: string;
}

export const ExampleTextInput = styled<ExampleTextInputProps, 'input'>('input')`
  border-radius: 0.3rem;
  font-family: inherit;
  max-width: 30rem;
`;

export default ExampleTextInput;

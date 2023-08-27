import { render, RenderOptions } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

// TODO: add application providers
// eslint-disable-next-line 
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
//TODO: add custom render with application providers
const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Providers, ...options })
  };
};
// This test setup file ignores some linting
// eslint-disable-next-line 
export * from "@testing-library/react"; 
export { customRender as render };
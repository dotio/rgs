export const createComponent = (styledComponent, className) => {
  if (process.env.WITH_TESTS === 'true') {
    return styledComponent.attrs({className})
  }
  return styledComponent
}
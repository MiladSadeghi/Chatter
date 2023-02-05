import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalTypography = createGlobalStyle`
h1 {
  ${tw`text-5xl font-black sm:(text-4xl font-bold)`}
}
h2 {
  ${tw`text-2xl font-semibold`}
}
h3 {
  ${tw`text-lg font-bold`}
}
h4 {
  ${tw`text-sm font-medium`}
}
h5 {
  ${tw`text-base font-light`}
}
h6 {
  ${tw`text-base font-light`}
}
p {
  ${tw`text-sm font-light`}
}
li {
  ${tw`text-base font-light`}
}
a {
  ${tw`text-base font-light`}
}
`;

export default GlobalTypography;
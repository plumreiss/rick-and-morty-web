import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.a`
  color: rgb(158, 158, 158);
  margin: 0 5px 0 0;
  font-size: 1em;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: orange;
    cursor: pointer;
  }
`;

export function BackHome({ url, value }) {
  return (
    <Link href={url} passHref>
      <StyledLink>{value}</StyledLink>
    </Link>
  );
}

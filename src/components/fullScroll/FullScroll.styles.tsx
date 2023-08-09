import styled from '@emotion/styled';

//full-scroll-container
export const Container = styled('div')`
  height: 100vh;
  width: 100vw;
  background-color: #353935;
  overflow: hidden;
`;

export const FullScrollContent = styled('div')`
  color: white;
  width: 100%;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const FullScrollPage1 = styled('div')`
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
`;

export const FullScrollPageContent = styled('div')`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

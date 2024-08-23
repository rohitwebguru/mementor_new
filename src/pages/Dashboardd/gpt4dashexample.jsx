import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #2d0003;
  color: white;
  font-family: 'Arial', sans-serif;
  height: 100vh;
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #50000a;
  padding: 20px;
`;

const SidebarItem = styled.div`
  padding: 15px 0;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #680010;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SwapContainer = styled.div`
  background-color: #4d004f;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const TokenSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Token = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #650061;
  padding: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #8e008e;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #a000a0;
  }
`;

const ConnectWalletButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  width: 400px;
`;

const ChartItem = styled.div`
  background-color: #3d003d;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const App = () => {
  return (
    <Container>
      <Sidebar>
        <SidebarItem>Dashboard</SidebarItem>
        <SidebarItem>Staking</SidebarItem>
        <SidebarItem>Memenator</SidebarItem>
        <SidebarItem>Leaderboards</SidebarItem>
        <SidebarItem>AI Tools</SidebarItem>
        <SidebarItem>Token Sniper</SidebarItem>
        <SidebarItem>Earn</SidebarItem>
        <SidebarItem>Airdrop</SidebarItem>
        <SidebarItem>Token Sniper</SidebarItem>
      </Sidebar>
      <MainContent>
        <SwapContainer>
          <TokenSelector>
            <Token>
              <span>SOL</span>
              <span>Max</span>
            </Token>
          </TokenSelector>
          <TokenSelector>
            <Token>
              <span>RAY</span>
              <span>Max</span>
            </Token>
          </TokenSelector>
          <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
        </SwapContainer>
        <ChartContainer>
          <ChartItem>
            <span>SOL</span>
            <span>$94.31</span>
          </ChartItem>
          <ChartItem>
            <span>RAY</span>
            <span>$2.33</span>
          </ChartItem>
        </ChartContainer>
      </MainContent>
    </Container>
  );
};

export default App;

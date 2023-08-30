import { MenuButton } from "@roe-monorepo/shared-features/src/header/components/MenuButton";
import { ConnectWalletButton } from "@roe-monorepo/shared-features/src/web3/components/ConnectWalletButton";
import { SwitchChainButton } from "@roe-monorepo/shared-features/src/web3/components/SwitchChainButton";
import { getSupportedChainIds } from "@roe-monorepo/shared-features/src/web3/helpers/getSupportedChainIds";
import { useWallet } from "@roe-monorepo/shared-features/src/web3/hooks/useWallet";

import { appLogo, roe } from "../../icons/brand";
import {
  Container,
  LogoContainer,
  AppLogoIcon,
  AppLogoMobileIcon,
  HeaderSwitcherContainer,
  ButtonsContainer,
} from "../styles/Header";

import { HeaderSwitcher } from "./HeaderSwitcher";

export const Header = () => {
  const { isConnected } = useWallet();
  const supportedChainIds = getSupportedChainIds();

  return (
    <Container>
      <LogoContainer>
        <AppLogoIcon src={appLogo} />
        <AppLogoMobileIcon src={roe} />
      </LogoContainer>
      <HeaderSwitcherContainer>
        <HeaderSwitcher />
      </HeaderSwitcherContainer>
      <ButtonsContainer>
        {/* <QuestButton /> */}
        {isConnected ? (
          <SwitchChainButton supportedChainIds={supportedChainIds} />
        ) : null}
        <ConnectWalletButton />
        <MenuButton />
      </ButtonsContainer>
    </Container>
  );
};

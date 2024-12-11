import React, { useState } from 'react';
import { useSearch } from '../../Search';
import styled from 'styled-components';

function Header({ spotlightRef }) {
  const { search, setSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && spotlightRef?.current) {
      spotlightRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <HeaderContainer>
      <Right>
        <Heading to="/">Exclusive</Heading>
      </Right>
      <Middle>
        <Navigation>
          <List to="/">Home</List>
          <List to="/contact">Contact</List>
          <List to="/about">About</List>
          <List to="/sign up">Sign Up</List>
        </Navigation>
      </Middle>
      <Left>

        <SearchBoxWrapper>
          {isSearchVisible && (
            <SearchBox>
              <SearchInput
                type="text"
                value={search}
                onChange={(input) => setSearch(input.target.value)}
                placeholder="What are you looking for?"
                onKeyPress={handleKeyPress}
              />
            </SearchBox>
          )}
          <SearchImage
            src={require("../../../assets/images/Vector (6).png")}
            alt="Search Icon"
            onClick={toggleSearch}
          />
        </SearchBoxWrapper>

        <NormalSearchBox>
          <SearchInputNormal
            type="text"
            value={search}
            onChange={(input) => setSearch(input.target.value)}
            placeholder="What are you looking for?"
            onKeyPress={handleKeyPress}
          />
          <SearchImageNormal src={require("../../../assets/images/Vector (6).png")} alt='image' SearchIcon onClick={toggleSearch} ></SearchImageNormal>
        </NormalSearchBox>

        <Image>
          <LikeIcon src={require("../../../assets/images/Vector (7).png")} alt='image'></LikeIcon>
          <ShopIcon src={require("../../../assets/images/Cart1.png")} alt='image'></ShopIcon>
        </Image>
      </Left>

      <HamburgerContainer isOpen={isOpen} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </HamburgerContainer>

      <MobileMenu isOpen={isOpen}>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>
        <a href="/sign up">Sign Up</a>
      </MobileMenu>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.5px solid gray;
    cursor: pointer;
`;
const Right = styled.div`
`;
const Heading = styled.h4`
     font-size: 24px;
     font-weight: 700;
     color: black;
     cursor: pointer;
    @media (min-width:360px) and (max-width:551px){
      font-size: 15px;
    }
`;
const Middle = styled.div`
    display: flex;
    
  @media (min-width: 360px) and (max-width: 950px){
    display: none;
  }
`;
const Navigation = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 48px;
`;
const List = styled.li`
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    color: black;

    &:hover {
        border-bottom: 1px solid gray
    }
`;
const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    @media (min-width:360px) and (max-width:551px){
      gap: 3px;
    }
`;
const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 7px;
  @media (min-width: 552px){
    display: none;
  }
`;
const SearchBox = styled.div`
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 12px;
  text-decoration: none;
`;
const SearchImage = styled.img``;

const NormalSearchBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   gap: 10px;
   background-color: #F5F5F5;
   padding: 7px 12px 7px 15px;
   @media (max-width: 551px){
      display: none;
   }
`;
const SearchInputNormal = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
`;
const SearchImageNormal = styled.img``;

const Image = styled.div`
    display: flex;
    align-items: center;
    gap:15px;
    @media (min-width:360px) and (max-width:551px){
      gap: 3px;
    }
`;
const LikeIcon = styled.img``;
const ShopIcon = styled.img``;

const HamburgerContainer = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 999;
  div {
    width: 30px;
    height: 4px;
    background-color: black;
    border-radius: 5px;
    transition: all 0.3s ease;
    @media (min-width:360px) and (max-width:551px){
      width: 20px;
    }
    &:nth-child(1) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translateY(8px)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    }
    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0)')};
    }

  }
  @media (max-width: 950px) {
    display: flex;
  }
`;
const MobileMenu = styled.div`
  position: absolute;
  top: 155px;
  right: 10px;
  width: 170px;
  background-color: black;
  color: white;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 15px;
  text-align: center;
  cursor: pointer;
  a {
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px;
    &:hover {
      background-color: gray;
    }
  }

  @media (min-width: 950px) {
    display: none;
  }
`;
export default Header;
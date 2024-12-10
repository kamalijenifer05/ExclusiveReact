import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Top() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsDropdownVisible(false);
    };

    return (
        <>
            <TopContainer>
                <Left>
                    <TopParagraph>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</TopParagraph>
                    <TopLink to="/Secondpage">ShopNow</TopLink>
                </Left>
                <Right>
                    <p>{selectedLanguage}</p>
                    <TopIcon src={require("../../../assets/images/Vector (5).png")} alt="image" onClick={toggleDropdown}></TopIcon>
                    {isDropdownVisible && (
                        <DropdownMenu>
                            <DropdownItem onClick={() => handleLanguageSelect('English')}>English</DropdownItem>
                            <DropdownItem onClick={() => handleLanguageSelect('Spanish')}>Spanish</DropdownItem>
                            <DropdownItem onClick={() => handleLanguageSelect('French')}>French</DropdownItem>
                            <DropdownItem onClick={() => handleLanguageSelect('German')}>German</DropdownItem>
                            <DropdownItem onClick={() => handleLanguageSelect('Italian')}>Italian</DropdownItem>
                        </DropdownMenu>
                    )}
                </Right>
            </TopContainer>
        </>
    );
}

const TopContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    gap: 80px;
    @media (min-width: 360px) and (max-width: 800px){
        font-size: 13px;
        gap: 40px;
    }
`;
const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;
const TopParagraph = styled.p`
    font-size: 14px;
    @media (min-width: 360px) and (max-width: 700px){
       display: none;
    }
`;
const TopLink = styled(Link)`
    display: flex;
    color: white;
    align-items: center;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid white;

    &:hover {
        background-color: #444; 
        cursor: pointer;
    }
`;
const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    gap: 10px;
    @media (min-width: 360px) and (max-width: 800px){
        gap: 0px;
    }
`;
const p = styled.p`
    font-size: 14px;
`;
const TopIcon = styled.img`
    cursor: pointer;
    margin-left: 10px;
`;
const DropdownMenu = styled.div`
    position: absolute;
    top: 59px;
    background-color: black;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    border-radius: 5px;
    width: 150px;
    padding: 10px 0;
    margin-right: -100px;
    @media (min-width: 360px) and (max-width: 800px){
        width: 130px;
        text-align: center;
    }
`;

const DropdownItem = styled.div`
    padding: 5px 15px;
    font-weight: 300;
    cursor: pointer;
    &:hover {
        background-color: gray;
    }
`;
export default Top;
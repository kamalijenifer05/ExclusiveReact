import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
    return (
        <FooterContainer>
            <FooterTop>

                <Exclusive>
                    <ExclusiveLogo to='/Home'>Exclusive</ExclusiveLogo>
                    <ExclusiveParagraph>Subscribe</ExclusiveParagraph>
                    <ExclusiveOrder>Get 10% off your first order</ExclusiveOrder>
                    <Bottom>
                        <ExclusiveInput type='email' placeholder="Enter your email" />
                        <ExclusiveArrow to = "#" src={require("../../../assets/images/Vector (4).png")} alt="image"></ExclusiveArrow>
                    </Bottom>
                </Exclusive>

                <Support>
                    <Heading>Support</Heading>
                    <ExclusiveUl>
                        <List>111 Bijoy sarani, Dhaka,<br /> DH 1515, Bangladesh.</List>
                        <List>exclusive@gmail.com</List>
                        <List>+88015-88888-9999</List>
                    </ExclusiveUl>
                </Support>

                <Support>
                    <Heading>Account</Heading>
                    <ExclusiveUl>
                        <List>My Account</List>
                        <List>Login / Register</List>
                        <List>Cart</List>
                        <List>WishListst</List>
                        <List>Shop</List>
                    </ExclusiveUl>
                </Support>

                <Support>
                    <Heading>Quick Listnk</Heading>
                    <ExclusiveUl>
                        <List>Privacy PoListcy</List>
                        <List>Terms Of Use</List>
                        <List>FAQ</List>
                        <List>Contact</List>
                    </ExclusiveUl>
                </Support>

                <Download>
                    <Heading>Download App</Heading>
                    <Scanner>
                        <Paragraph>Save $3 with App New User Only</Paragraph>
                        <Images>
                            <ScannerImage to = "#" src={require("../../../assets/images/Qrcode 1.png")} alt="" />
                            <AppStore>
                                <PlayStore to = "#" src={require("../../../assets/images/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.png")} alt="image" />
                                <PlayStore to = "#" src={require("../../../assets/images/download-appstore.png")} alt="image" />
                            </AppStore>
                        </Images>
                        <SocialMedia>
                            <FaceBook to = "#" src={require("../../../assets/images/Vector.png")} alt="image" />
                            <FaceBook to = "#" src={require("../../../assets/images/Vector (1).png")} alt="image" />
                            <FaceBook to = "#" src={require("../../../assets/images/icon-instagram.png")} alt="image" />
                            <FaceBook to = "#" src={require("../../../assets/images/Vector (3).png")} alt="image" />
                        </SocialMedia>
                    </Scanner>
                </Download>
            </FooterTop>

            <FooterBottom>
                <Copyrights>&copy;</Copyrights>
                <Company>Copyright Rimel 2022. All right reserved</Company>
            </FooterBottom>
        </FooterContainer>
    );
}

const FooterContainer = styled.div`
   background-color: black;
`;
const FooterTop = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border-bottom: 1px solid gray;
    padding: 50px;
    @media (max-width: 870px){
    gap: 50px 8px ;
   }
`;
const Exclusive = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    width: 270px;
`;
const ExclusiveLogo = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 25px;
    font-weight: 600;
`;
const ExclusiveParagraph = styled.h3`
    font-size: 20px;
`;
const ExclusiveOrder = styled.p`
    font-size: 14px;
    font-weight: 300;
`;
const Bottom = styled.div`
    border: 1px solid white;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 200px;
`;
const ExclusiveInput = styled.input`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 14px;
    &:focus{
        outline: none;
    }
`;
const ExclusiveArrow = styled.img`
    cursor: pointer;
`;

const Support = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    width: 250px;
    @media (max-width: 870){
    }
`;
const Heading = styled.h3`
    font-size: 20px;
`;
const ExclusiveUl = styled(Link)`
    text-decoration: none;
    color: white;
    list-style: none;
    line-height: 35px;
    
`;
const List = styled.li`
    line-height: 20px;
    padding-bottom: 15px;
`;
const Download = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    width: 250px;
`;
const Scanner = styled.div``;
const Paragraph = styled.p`
    font-size: 14px;
    font-weight: 200;
`;
const Images = styled(Link)`
    display: flex;
    gap: 10px;
`;
const ScannerImage = styled.img``; 

const AppStore = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const PlayStore = styled.img``;
const SocialMedia = styled(Link)`
    display: flex;
    align-items: center;
    gap: 40px;
    margin-top: 20px;
`;
const FaceBook = styled.img``;

const FooterBottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: gray;
`;
const Copyrights = styled.p`
    font-size: 20px;
`;
const Company = styled.p`
    font-size: 14px;
`;
export default Footer;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Category from './Category';
import data from '../../../Data/products.json';
import { useSearch } from '../../Search';
import StarRating from '../../Starrating';

function Spotlight({ spotlightRef }) {
    const { search } = useSearch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState(data);
    const [itemsToShow, setItemsToShow] = useState(8);
    const [selectedColors, setSelectedColors] = useState({});
    const [category, setCategory] = useState(null);

    useEffect(() => {
        setProducts(allProducts.slice(0, itemsToShow));
    }, [allProducts, itemsToShow]);

    const handleColorSelect = (productId, color) => {
        setSelectedColors(prevState => ({
            ...prevState, [productId]: color,
        }));
    };

    const filteredProducts = products.filter(product => {
        const isSearchMatch = product.name.toLowerCase().includes(search.toLowerCase());
        const isCategoryMatch = category ? product.categories === category : true;
        console.log(product.name, isSearchMatch, isCategoryMatch);
        return isSearchMatch && isCategoryMatch;
    });

    const [likedProducts, setLikedProducts] = useState(new Set());
    const handleLikeClick = (productId) => {
        setLikedProducts((prevLiked) => {
            const newLiked = new Set(prevLiked);
            if (newLiked.has(productId)) {
                newLiked.delete(productId);
            } else {
                newLiked.add(productId);
            }
            return newLiked;
        });
    };

    const handleCategorySelect = (category) => {
        setCategory(category);
    };

    const handleClickn=(id) =>{
        navigate(`/Gaming/${id}`)
    }
    return (
        <>
            <SpotContainer>
                <Leftbox>
                    <HeaderSection>
                        <AppleIcon src={require("../../../assets/images/1200px-Apple_gray_logo 1.png")} alt="image"></AppleIcon>
                        <Paragraph>iPhone 14 Series</Paragraph>
                    </HeaderSection>
                    <Middle>
                        <Voucher>Up to 10% off Voucher</Voucher>
                    </Middle>
                    <Right>
                        <SpotLink to="/Secondpage">Shop Now</SpotLink>
                        <ArrowIcon src={require("../../../assets/images/Vector (9).png")} alt="image"></ArrowIcon>
                    </Right>
                </Leftbox>

                <RightBox>
                    <MobileImage src={require("../../../assets/images/hero_endframe__cvklg0xk3w6e_large 2.png")} alt="image"></MobileImage>
                </RightBox>
            </SpotContainer>

            <Category setCategoryFilter={handleCategorySelect} />

            <ProductsContainer ref={spotlightRef}>
                <Container>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <DogFood key={index}>
                                <DogTop>
                                    <NewDiv>
                                        {product.new ? <NewButton>New</NewButton> : null}
                                        {product.discount && product.offer ? <Offer>-{product.offer}%</Offer> : null}
                                    </NewDiv>
                                    <DogImage src={require(`../../../assets/images/${product.image}`)} alt="image" onClick={()=>{handleClickn(product.id)}}/>
                                    <Icons>
                                        <LikeImage
                                            src={require(`../../../assets/images/${product.icons}`)}
                                            alt="image"
                                            onClick={() => handleLikeClick(product.id)}
                                            style={{
                                                backgroundColor: likedProducts.has(product.id) ? 'red' : '',
                                                cursor: 'pointer',
                                            }} />
                                        <LikeImage src={require(`../../../assets/images/${product.icons1}`)} alt="image" />
                                    </Icons>

                                    <AddToCart id='btn'>
                                        <AddToParagraph> Add To Cart</AddToParagraph>
                                    </AddToCart>

                                </DogTop>
                                <DogBottom>
                                    <Heading>{product.name}</Heading>
                                    <StarDiv>
                                        <Amount>$ {product.cost}</Amount>
                                        {product.discountedCost ? <Discount>${product.discountedCost}</Discount> : null}
                                        <StarRating rating={product.rating} />
                                        <Count>({product.buyed})</Count>
                                    </StarDiv>

                                    {product.color && (
                                        <ColorDiv>
                                            {product.color1 && (
                                                <Red
                                                    style={{
                                                        backgroundColor: product.color1,
                                                        transform: selectedColors[product.id] === product.color1 ? 'scale(1)' : 'scale(.9)',
                                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                        border: selectedColors[product.id] === product.color1 ? '1px solid black' : '',
                                                    }}
                                                    onClick={() => handleColorSelect(product.id, product.color1)}
                                                ></Red>
                                            )}

                                            {product.color2 && (
                                                <Yellow
                                                    style={{
                                                        backgroundColor: product.color2,
                                                        transform: selectedColors[product.id] === product.color2 ? 'scale(1)' : 'scale(.8)',
                                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                        border: selectedColors[product.id] === product.color2 ? '1px solid black' : '',
                                                    }}
                                                    onClick={() => handleColorSelect(product.id, product.color2)}
                                                />
                                            )}
                                        </ColorDiv>
                                    )}
                                </DogBottom>
                            </DogFood>
                        ))
                    ) : (<NoProductsMessage>No Products Found In This Category.</NoProductsMessage>)}
                </Container> 

                <Bottom>
                    <Button to="/Secondpage">View All Products</Button>
                </Bottom>

            </ProductsContainer>

            <Service>
                <Delivery>
                    <DeliveryTop>
                        <Image src={require("../../../assets/images/icon-delivery.png")} alt="image" />
                    </DeliveryTop>
                    <DeliveryBottom>
                        <Title>FREE AND FAST DELIVERY</Title>
                        <DeliveryParagraph>Free delivery for all orders over $140</DeliveryParagraph>
                    </DeliveryBottom>
                </Delivery>

                <Delivery>
                    <DeliveryTop>
                        <Image src={require("../../../assets/images/Icon-Customer service.png")} alt="image" />
                    </DeliveryTop>
                    <DeliveryBottom>
                        <Title>24/7 CUSTOMER SERVICE</Title>
                        <DeliveryParagraph>Friendly 24/7 customer support</DeliveryParagraph>
                    </DeliveryBottom>
                </Delivery>

                <Delivery>
                    <DeliveryTop>
                        <Image src={require("../../../assets/images/Icon-secure.png")} alt="image" />
                    </DeliveryTop>
                    <DeliveryBottom>
                        <Title>MONEY BACK GUARANTEE</Title>
                        <DeliveryParagraph>We reurn money within 30 days</DeliveryParagraph>
                    </DeliveryBottom>
                </Delivery>
            </Service>
        </>
    );
}

const SpotContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    background-color: black;
    color: white;
    margin: 30px 180px;
    border-radius: 10px;
    padding: 20px;
    @media (min-width: 1000px) and (max-width: 1300px){
       display: flex;
       flex-direction: column;
    }
    @media (min-width: 360px) and (max-width: 999px){
       display: flex;
       flex-direction: column;
    }
    @media (min-width: 590px) and (max-width: 719px){
        margin: 30px 130px;
    }
    @media (min-width: 420px) and (max-width: 589px){
       margin: 30px 100px;
    }
    @media (min-width: 360px) and (max-width: 419px){
       margin: 30px 50px;
    }
`;
const Leftbox = styled.div`
    margin: 0px 0px 10px 0px;
    padding: 0;
    @media (min-width: 1000px) and (max-width: 1300px){
       order: 2;
    }
    @media (min-width: 360px) and (max-width: 999px){
       order: 2;
    }
`;
const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;
const AppleIcon = styled.img``;
const Paragraph = styled.p`
    font-size: 12px;
    font-weight: 300;
`;
const Middle = styled.div`
    width: 290px;
    margin: 0;
    padding: 0;
`;
const Voucher = styled.h2`
    font-size: 48px;
    font-weight: 400;
    line-height: 60px;
    @media (min-width: 720px) and (max-width: 999px){
        font-size: 35px;
        line-height: 40px;
    }
    @media (min-width: 360px) and (max-width: 719px){
        font-size: 30px;
        line-height: 40px;
    }
`;
const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 0;
    padding: 0;
`;
const SpotLink = styled(Link)`
    color: white;
    text-decoration: none;
    border-bottom: 1px solid white;
`;
const ArrowIcon = styled.img``;
const RightBox = styled.div`
    @media (min-width: 1000px) and (max-width: 1300px){
        order: 1;
    }
    @media (min-width: 360px) and (max-width: 999px){
        order: 1;
    }
`;
const MobileImage = styled.img`
     @media (min-width: 720px) and (max-width: 999px){
        width: 340px;
    }
    @media (min-width: 590px) and (max-width: 719px){
       display: none;
    }
    @media (min-width: 360px) and (max-width: 589px){
        display: none;
    }
`;
const ProductsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 180px;
`;
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:space-evenly;
    gap: 11px;
    border-bottom: 3px solid #F5F5F5;
    padding: 20px 0px;
`;
const DogFood = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 380px;

`;
const DogTop = styled.div`
    display: flex;
    background-color: #F5F5F5;
    padding:25px;
    gap: 0px 0px;
    width: 250px;
    height: 270px;
    align-items: center;
    position: relative;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    &:hover #btn{
        display: block;
    }
`;
const DogImage = styled.img``;
const Icons = styled.div`
    display: flex;
    flex-direction:column;
    gap: 10px;
    position: absolute;
    top: 5px;
    right: 15px;
`;
const LikeImage = styled.img`
    background-color: white;
    border-radius: 50%;
    padding: 5px;
`;
const AddToCart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  
`;
const AddToParagraph = styled.button`
    border: none;
    width: 300px;
    bottom: 0px;
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 400;
    padding: 5px;
    border-radius: 0px 0px 4px 4px;
    position: absolute;
    left: 0;
    cursor: pointer;
`;
const NewDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;

`;
const NewButton = styled(Link)`
    text-decoration: none;
    color: white;
    background-color: #00FF66;
    width: 30px;
     height: 20px;
     padding: 0px 12px 4px 12px;
     border-radius: 4px;
     font-weight: 400;
     display: flex;
     position: absolute;
     top: 15px;
     left: 10px;
`;
const Offer = styled(Link)`
     text-decoration: none;
     color: white;
     background-color: #DB4444;
     width: 35px;
     height: 20px;
     padding: 0px 12px 4px 10px;
     border-radius: 4px;
     display: flex;
     position: absolute;
     top: 15px;
     left: 10px;
`;
const DogBottom = styled.div`
    margin-top: 20px;
    height: 140px;
`;
const Heading = styled.h4`
    font-size: 16px;
    font-weight: 500;
    line-height: 35px;
    margin: 0px;
`;
const StarDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0px;
    padding: 0px;
`;
const Amount = styled.p`
    margin: 0px;
    color: #DB4444;
    font-size: 16px;
    font-weight: 500;
`;
const Discount = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: gray;
    text-decoration: line-through;
`;
const Rating = styled.img``;
const Count = styled.p`
    margin: 0px;
    color: gray;
    font-size: 14px;
    font-weight: 600;
`;

const ColorDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const Red = styled.div`
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
`;
const Yellow = styled.div`
     width: 18px;
     height: 18px;
     background-color: #DB4444;
     border-radius: 50%;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #DB4444;
    border-radius: 4px;
    width: 234px;
    height: 56px;
    padding: 16px 48px;
    margin: 40px;
    cursor: pointer;
`;
const Button = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 400;
`;

const Service = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 88px;
    margin: 80px;
`;
const Delivery = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 20px;
`;
const DeliveryTop = styled.div`
    background-color: black;
    padding: 30px;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 10px solid gray;
`;
const Image = styled.img``;
const DeliveryBottom = styled.div``;
const Title = styled.h5`
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    padding: 10px;
    @media (min-width: 360px) and (max-width: 426px){
        font-size: 16px;
    }
`;
const DeliveryParagraph = styled.p`
     font-size: 14px;
     font-weight: 400;
     margin: 0;
     padding: 0;
`;
const NoProductsMessage = styled.p`
    font-size: 20px;
    font-weight: 400;
`;
export default Spotlight;
import React, { useState, useEffect } from 'react';
import { useSearch } from './Search';
import styled from 'styled-components';
import Top from './screens/includes/Top';
import Header from './screens/includes/Header';
import Footer from './screens/includes/Footer';
import { Link, useNavigate } from 'react-router-dom';
import data from '../Data/products.json';
import Starrating from "./Starrating";

function Secondpage() {
    const { search } = useSearch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedColors, setSelectedColors] = useState({});
    const [likedProducts, setLikedProducts] = useState(new Set());

    useEffect(() => {
        setProducts(data); 
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleNextPage = (id) => {
        navigate(`/Gaming/${id}`);
    };

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

    const handleColorSelect = (productId, color) => {
        setSelectedColors(prevState => ({
            ...prevState, [productId]: color,
        }));
    };

    return (
        <>
            <Top />
            <Header />

            <Navigation>
                <Path to="/">Home</Path>
                <Slash>/</Slash>
                <Products to="/Secondpage">Products</Products>
            </Navigation>

            <ProductsContainer>
                <Container>
                    {filteredProducts.map((product, index) => (
                        <DogFood key={index}>
                            <DogTop>
                                <NewDiv>
                                    {product.new ? <NewButton>New</NewButton> : null}
                                    {product.discount && product.offer ? <Offer>-{product.offer}%</Offer> : null}
                                </NewDiv>
                                <DogImage
                                    src={require(`../assets/images/${product.image}`)}
                                    alt="image"
                                    onClick={() => handleNextPage(product.id)}
                                />
                                <Icons>
                                    <LikeImage
                                        src={require(`../assets/images/${product.icons}`)}
                                        alt="image"
                                        onClick={() => handleLikeClick(product.id)}
                                        style={{
                                            backgroundColor: likedProducts.has(product.id) ? 'red' : '',
                                            cursor: 'pointer',
                                        }}
                                    />
                                    <LikeImage src={require(`../assets/images/${product.icons1}`)} alt="image" />
                                </Icons>

                                <AddToCart id="btn">
                                    <AddToParagraph> Add To Cart</AddToParagraph>
                                </AddToCart>
                            </DogTop>

                            <DogBottom>
                                <Heading>{product.name}</Heading>
                                <StarDiv>
                                    <Amount>$ {product.cost}</Amount>
                                    {product.discountedCost ? <Discount>${product.discountedCost}</Discount> : null}
                                    <Starrating  rating={product.rating} />
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
                    ))}
                </Container>
            </ProductsContainer>
            <Footer />
        </>
    );
}
export default Secondpage;

const Navigation = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: center;
    margin: 30px 180px;

    @media (min-width: 360px) and (max-width: 500px){
        display: flex;
        justify-content: center;
        align-items: center;
  }
`;
const Path = styled(Link)`
    text-decoration: none;
    color: gray;
    &:hover{
        color: black;
    }
`;
const Slash = styled.p`
    color: gray;
`;
const Products = styled(Link)`
    text-decoration: none;
    color: gray;
    &:hover{
        color: black;
    }
`;

const ProductsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 180px;
`;
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:space-between;
    gap: 5px;
    padding: 20px 0px;
`;
const DogFood = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 400px;
`;
const DogTop = styled.div`
    display: flex;
    background-color: #F5F5F5;
    padding:25px;
    gap: 0px 0px;
    width: 270px;
    height: 290px;
    align-items: center;                               
    position: relative;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    flex-direction: column;   
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
    width: 320px;
    bottom: 0px;
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 400;
    padding: 6px;
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
    padding: 5px 0px;
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
    margin: 0;
`;

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
    background-color: #DB4444;
    border-radius: 50%;
`;
const Yellow = styled.div`
     width: 18px;
     height: 18px;
     background-color: #DB4444;
     border-radius: 50%;
`;

const Bottom = styled.div``;
const Button = styled(Link)``;
const BottomButton = styled(Link)`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;

  &:hover {
    background-color: var(--dark-green);
  }
`;
// -----------------------------------------------------------------------------------------------

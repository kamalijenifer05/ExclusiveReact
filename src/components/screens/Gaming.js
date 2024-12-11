import React, { useState, useEffect } from 'react';
import Top from './includes/Top';
import Header from './includes/Header';
import Footer from './includes/Footer';
import data from "../../Data/products.json";
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '../Starrating';
import { useSearch } from '../Search';

function Gaming() {
  const { id } = useParams();
  const { search } = useSearch();
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [likedProducts, setLikedProducts] = useState(new Set());

  useEffect(() => {
    setProducts(data);
  }, []);

  useEffect(() => {
    const fetchDetails = () => {
      try {
        const selectedDetails = data.find(item => item.id === parseInt(id));
        setDetails(selectedDetails);

        if (selectedDetails) {
          const filteredRelatedItems = data
          .filter(item =>
            (item.category === selectedDetails.category || !selectedDetails.category) &&
            (item.categories === selectedDetails.categories || !selectedDetails.categories) &&
            item.id !== selectedDetails.id &&
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 4);

          setRelatedItems(filteredRelatedItems);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!details) {
    return <p>Product not found.</p>;
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleColorSelect = (productId, color) => {
    setSelectedColors(prevState => ({
      ...prevState, [productId]: color,
    }));
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
  return (
    <>
      <Top />
      <Header />

      <Navigation>
        <Path to="/">Home</Path>
        <Slash>/</Slash>
        <ProductType to="/Secondpage">Gaming</ProductType>
        <Slash>/</Slash>
        <ProductName >{details.name}</ProductName>
      </Navigation>

      <ProductsDetailsPage>
        <ProductContainer>
          <Left>
            <ImageTag src={require(`../../assets/images/${details.image}`)} alt="image" />
          </Left>

          <Container>
            <Right>
              <RightTop>
                <Heading>{details.name}</Heading>
                <RatingDiv>
                  <StarRating rating={details.rating} />
                  <Reviews>({details.reviews})</Reviews>
                  <SlashRating>|</SlashRating>
                  <Stock>{details.available}</Stock>
                </RatingDiv>
                <Amount>${details.cost}</Amount>
              </RightTop>

              <MiddlePage>
                <ProductDetails>{details.about}</ProductDetails>
              </MiddlePage>

              <Bottom>

                <Colour>
                  <Title>Colours :</Title>
                  {details.color && (
                    <ProductColor>
                      {details.color1 && (
                        <Blue
                          style={{
                            backgroundColor: details.color1,
                            transform: selectedColors[details.id] === details.color1 ? 'scale(1.2)' : 'scale(.9)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            border: selectedColors[details.id] === details.color1 ? '1px solid black' : '',
                          }}
                          onClick={() => handleColorSelect(details.id, details.color1)}>
                        </Blue>)}

                      {details.color2 && (
                        <Red
                          style={{
                            backgroundColor: details.color2,
                            transform: selectedColors[details.id] === details.color2 ? 'scale(1.2)' : 'scale(.9)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            border: selectedColors[details.id] === details.color2 ? '1px solid black' : '',
                          }}
                          onClick={() => handleColorSelect(details.id, details.color2)}>
                        </Red>)}
                    </ProductColor>
                  )}
                </Colour>
              </Bottom>
            </Right>

            <DeliveryProducts>
              <DeliveryTop>
                <DeliveryImage>
                  <VanImage src={require("../../assets/images/icon-delivery (1).png")} />
                </DeliveryImage>
                <Content>
                  <FreeDelivery>Free Delivery</FreeDelivery>
                  <DeliveryAvailability>Enter your postal code for Delivery Availability</DeliveryAvailability>
                </Content>
              </DeliveryTop>

              <DeliveryBottom>
                <DeliveryImage>
                  <VanImage src={require("../../assets/images/Icon-return.png")} />
                </DeliveryImage>
                <Content>
                  <FreeDelivery>Return Delivery</FreeDelivery>
                  <Availability>Free 30 Days Delivery Returns. <Span>Details</Span></Availability>
                </Content>
              </DeliveryBottom>
            </DeliveryProducts>
          </Container>
        </ProductContainer>
      </ProductsDetailsPage>

      {relatedItems.length > 0 ? (
      relatedItems.length > 0 && (
        <RelatedProducts>
          <RelatedItemTop>
            <RelatedColor></RelatedColor>
            <RelatedItem>Related Items</RelatedItem>
          </RelatedItemTop>

          
          <ProductsContainer>
            <Containerer>
              {relatedItems.map((product, index) => (
                <DogFood key={index}>
                  <DogTop>
                    <NewDiv>
                      {product.new ? <NewButton>New</NewButton> : null}
                      {product.discount && product.offer ? <Offer>-{product.offer}%</Offer> : null}
                    </NewDiv>
                    <DogImage
                      src={require(`../../assets/images/${product.image}`)}
                      alt="image"
                    />
                    <Icons>
                      <LikeImage
                        src={require(`../../assets/images/${product.icons}`)}
                        alt="image"
                        onClick={() => handleLikeClick(product.id)}
                        style={{
                          backgroundColor: likedProducts.has(product.id) ? 'red' : '',
                          cursor: 'pointer',
                        }}
                      />
                      <LikeImage src={require(`../../assets/images/${product.icons1}`)} alt="image" />
                    </Icons>

                    <AddToCart id="btn">
                      <AddToParagraph> Add To Cart</AddToParagraph>
                    </AddToCart>
                  </DogTop>

                  <DogBottom>
                    <ProductHeading>{product.name}</ProductHeading>
                    <StarDiv>
                      <ProductAmount>$ {product.cost}</ProductAmount>
                      {product.discountedCost ? <Discount>${product.discountedCost}</Discount> : null}
                      <StarRating rating={product.rating} />
                      <Count>({product.buyed})</Count>
                    </StarDiv>

                    {product.color && (
                      <ColorDiv>
                        {product.color1 && (
                          <ProductRed
                            style={{
                              backgroundColor: product.color1,
                              transform: selectedColors[product.id] === product.color1 ? 'scale(1)' : 'scale(.9)',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                              border: selectedColors[product.id] === product.color1 ? '1px solid black' : '',
                            }}
                            onClick={() => handleColorSelect(product.id, product.color1)}
                          ></ProductRed>
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
            </Containerer>
          </ProductsContainer>
        </RelatedProducts>
      ) ) : (<NoProductsMessage>No Products Found In This Category.</NoProductsMessage>)}
      <Footer />
    </>
  );
}
const NoProductsMessage = styled.p`
    font-size: 20px;
    font-weight: 400;
    margin: 100px;
    display: flex;
    justify-content: center;
`;
const Navigation = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: center;
    margin: 50px 180px;
    @media (min-width: 360px) and (max-width: 684px){
      margin: 50px 25px;
    }
    @media (min-width: 1049px) and (max-width: 1500px){
    margin: 50px 120px;
  }
  @media (min-width: 360px) and (max-width: 684px){
    font-size: 12px;
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
const ProductType = styled(Link)`
    text-decoration: none;
    color: gray;
    &:hover{
        color: black;
    }
`;
const ProductName = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 16px;
    font-weight: 500px;
`;

const ProductsDetailsPage = styled.div`
    width:100%;
`;
const ProductContainer = styled.div`
  width:100%;
  display: flex;
  align-items:center;
  justify-content: space-evenly;
  gap: 0rem;
  @media (max-width:1049px){
    gap:5rem;
    flex-direction: column;
    margin: 0px;
    justify-content: center;
}
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap:1rem;
  width:40%;
  @media (max-width: 1049px){
  }
`;
const Left = styled.div`
  background-color: #F5F5F5;
  padding: 5%;
  width:18%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1050px) and (max-width: 1300px){
    padding: 10%;
  }
  @media (min-width: 360px) and (max-width: 1049px){
    padding: 20%;
  }
`;
const ImageTag = styled.img`
  width: 100%;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 360px) and (max-width: 613px){
    gap: 5px;
  }
`;
const RightTop = styled.div`
`;
const Heading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  @media (min-width: 360px) and (max-width: 613px){
    font-size: 16px;
  }
`;
const RatingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (min-width: 360px) and (max-width: 613px){
    gap: 0px;
  }
`;
const Reviews = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: gray;
`;
const SlashRating = styled.p`
  color: gray;
  margin: 0;
  padding: 0;
  @media (min-width: 360px) and (max-width: 492px){
    display: none;
  }
`;
const Stock = styled.p`
  color: #00FF66;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  @media (min-width: 360px) and (max-width: 492px){
    display: none;
  }
`;
const Amount = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  @media (min-width: 360px) and (max-width: 613px){
    font-size: 20px;
  }
`;

const MiddlePage = styled.div`
  width: 350px;
  border-bottom: 2px solid gray;
  padding: 20px 0px;
  @media (min-width: 400px) and (max-width: 613px){
    width: 250px;
  }
  @media (min-width: 360px) and (max-width: 399px){
    width: 200px;
  }
`;
const ProductDetails = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  margin: 0;
  padding: 0;
  
`;

const Bottom = styled.div``;
const Colour = styled.div`
  display: flex;
  gap: 15px ;
`;
const Title = styled.h4`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  padding: 20px 0px;
  @media (min-width: 360px) and (max-width: 613px){
    font-size: 16px;
  }
`;

const ProductColor = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   gap: 10px;
`;
const Blue = styled.div`
    width: 15px;
    height: 15px;
    background-color: #A0BCE0;
    border: 1.5px solid black;
    border-radius: 50%;
`;
const Red = styled.div`
    width: 15px;
    height: 15px;
    background-color: #E07575;
    border: 1.5px solid black;
    border-radius: 50%;
`;

const DeliveryProducts = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 15px;
  gap: 20px;
`;
const DeliveryTop = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 3px solid #F5F5F5;
 
`;
const DeliveryImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const VanImage = styled.img``;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const FreeDelivery = styled.h6`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;
const DeliveryAvailability = styled(Link)`
  font-size: 12px;
  font-weight: 400;
  color: black;
`;
const Availability = styled.p`
   font-size: 12px;
   font-weight: 400;
   margin: 0;
   padding: 0;
`;
const Span = styled(Link)`
  color: black;
`;
const DeliveryBottom = styled.div`
   display: flex;
   gap: 20px;
`;
const RelatedProducts = styled.div`
     display: flex;
     justify-content: space-around;
     flex-direction: column;
     margin: 100px 180px;
     @media (min-width: 450px) and (max-width: 684px){
      margin: 50px 70px;
    }
    @media (min-width: 360px) and (max-width: 449px){
      margin: 20px;
    }
 `;
const RelatedItemTop = styled.div`
     display: flex;
     text-align: center;
     align-items: center;
     gap: 10px;
 `;
const RelatedColor = styled.div`
     background-color: #DB4444;
     width: 20px;
     height: 40px;
     border-radius: 4px;
 `;
const RelatedItem = styled.h2`
    font-size: 16px;
    font-weight: 600;
 `;

const ProductsContainer = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
margin: 30px 0px;
`;
const Containerer = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content:space-between;
gap: 35px;
padding: 20px 0px;
@media (min-width: 1744px){
      gap: 10px;
     }
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
const ProductHeading = styled.h4`
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


const ProductAmount = styled.p`
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
const ProductRed = styled.div`
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
export default Gaming;




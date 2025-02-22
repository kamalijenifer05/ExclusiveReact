import styled from 'styled-components';
import data from '../../../Data/data.json';
import React, { useState, useEffect } from 'react';

function Category({ setCategoryFilter }) {
    const [categoryItem, setCategoryItem] = useState([]);

    useEffect(() => {
        setCategoryItem(data);
    }, []);

    const handleCategoryClick = (category) => {
        setCategoryFilter(category);
    };

    return (
        <Categories>
            <Top>
                <Color></Color>
                <Title>Categories</Title>
            </Top>
            <Head>Browse By Category</Head>
            <Items>
                {categoryItem.map((item, index) => (
                    <Image key={index}>
                        <Img
                            src={require(`../../../assets/images/${item.image}`)}
                            alt={item.name} />
                        <BottonTag onClick={() => handleCategoryClick(item.name)}>{item.name}</BottonTag>
                    </Image>
                ))}
            </Items>
        </Categories>
    );
};

const Categories = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin: 50px 180px;
    flex-wrap: wrap;
    @media (min-width: 420px) and (max-width: 589px){
       margin: 30px 100px;
    }
    @media (min-width: 360px) and (max-width: 419px){
       margin: 30px 50px;
    }
    @media (min-width: 320px) and (max-width: 359px){
       margin: 30px 50px;
    }
`;
const Top = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    gap: 10px;
`;
const Color = styled.div`
    background-color: #DB4444;
    width: 20px;
    height: 40px;
    border-radius: 4px;
`;
const Title = styled.h5`
    font-size: 16px;
    font-weight: 600;
    color:  #DB4444;
    margin: 0;
`;
const Head = styled.h2`
    font-size: 36px;
    font-weight: 600;
    @media (min-width: 320px) and (max-width: 359px){
        margin: 10px 0px;
        line-height: 40px;
        font-size: 20px;
    }
`;

const Items = styled.div`
    display: flex;
    flex-wrap :wrap;
    text-align: center;
    justify-content: center;
    margin-top: 20px;
    gap: 30px;
    cursor: pointer;
`;
const Image = styled.div`
    border: 1px solid gray;
    width: 170px;
    height: 145px;
    border-radius: 4px;
    padding-top: 5px;
    line-height: 20px;
    @media (max-width: 1743px){

    }
`;
const Img = styled.img`
      padding: 5px;
`;
const BottonTag = styled.div`
    font-size: 14px;
    font-weight: 400;
    border: none;
    text-decoration: none;
    padding: 10px;
`;
export default Category;

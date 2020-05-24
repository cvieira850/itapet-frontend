import styled from 'styled-components';

import { actionButton } from '../../styles/util';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;

  strong {
    flex: 1;
    color: #444444;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    ${actionButton}
    width: 142px;
    height: 36px;
    margin-right: 16px;
    border: dashed;
    span {
      margin-left: 5px;
    }

  }

  span {
    display: flex;
    align-items: center;
    position: relative;

    svg {
      position: absolute;
      left: 10px;
    }

    input {
      width: 237px;
      height: 36px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding-left: 35px;
    }
  }
`;

export const NoData = styled.div`
  margin-top: 20px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
  }
`;

export const Data = styled.div`

  width: 100%;
  font-size: 16px;

  padding: 30px;
  border-radius: 4px;

  div{
    text-align: center;
    margin: 20px auto;
    color: #555555;
    width: 80%;
    background-color: #fff;
    font-weight: bold;
    line-height: 19px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 16px 0;
    border: 5px solid #eeeeee;
    border-radius: 5px;
      :hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
      }
      span {
        display: flex;
        margin-top: -10px;
        background-color: #4DAB9A;
        width: 68px;
        border-radius: 4px;
        height: 24px;
        color: #FFF;
        justify-content: center;
        align-items: center;
      }
      h4{
        color: #666666;
        margin: 10px 0 ;
      }
      p {
        color: #666666;
        text-align: right;
        margin-right: 4px;

      }


      &:nth-child(3) {
        text-align: center;
      }
      &:last-child {

        text-align: center;
      }
      button {
        background: none;
        border: 0;

          color: #4d85ee;


        &:last-child {
          color: #de3b3b;
          margin-left: 23px;
        }
      }

    &:last-child {
      p {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }

  }
`;

export const Paginator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background: #fff;
    font-weight: bold;
    color: #ee4d64;
    font-size: 16px;
    transition: background 0.2s;
    &:disabled {
      color: #ddd;
    }
    &:first-child {
      margin-right: 10px;
    }
  }
`;

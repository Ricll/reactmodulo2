import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;
    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 14px;
        font-style: italic;
        color: #999;
      }
      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
  div.removeBtn {
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;

    button {
      width: 80px;
      height: 40px;
      padding: 0 10px;
      margin-left: 10px;
      background: #63f5b0;
      color: #444;
      border: 0;
      font-size: 14px;
      font-weight: bold;
      border-radius: 3px;

      &:hover {
        background: #52d89f;
      }
    }
  }
`;

// padding: 12px 20px = 12 vertical 20 horizontal //
//

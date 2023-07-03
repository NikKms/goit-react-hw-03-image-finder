import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Loadoverlay } from './Loader.styled';

export class Loader extends Component {
  render() {
    return (
      <Loadoverlay>
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </Loadoverlay>
    );
  }
}

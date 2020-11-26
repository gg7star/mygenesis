import React, { Component } from 'react'
import AppView from './screens/AppView';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';

let persistor = persistStore(store);

// class App extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       didFinish: true,
//     }
//   }

//   onComplete = () => {
//   };

//   onFailedLoad = () => {
//   };

//   render() {
//     if (this.state.didFinish) {
//       return (
//         <Provider store={store}>
//           <PersistGate loading={null} persistor={persistor}>
//             <AppView />
//           </PersistGate>
//         </Provider>
//       )
//     } else {
//       return null;
//     }
//   }
// };

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppView />
      </PersistGate>
    </Provider>
  );
};

export default App;

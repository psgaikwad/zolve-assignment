import React from 'react'
import Layout from './layout.jsx'


function layoutWrapper(WrappedComponent, options) {
    return class extends React.Component {
      render() {
        return (
            <Layout 
              headerText={options && options.headerText?options.headerText:""} 
              showBackArrow={options && options.showBackArrow?true:false}
              link={options && options.link?options.link:false}>
                <WrappedComponent {...this.props} />
            </Layout>
        )
      }
    }
}

export default layoutWrapper;
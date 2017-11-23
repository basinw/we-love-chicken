import React from 'react'
import Header from '../../components/Header'
import IndexPage from '../../components/indexPage'

class IndexContainer extends React.Component {
    componentWillMount = () => {
        
    }
    
    render = () => {
        return (
            <div>
                <Header />
                <IndexPage />
            </div>
        )    
    }
}
// const Index = () => (
//     <div>
//         <Header />
//         <IndexPage />
//     </div>
// )

export default IndexContainer
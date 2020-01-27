import get from 'lodash.get'
import PropTypes, { any } from 'prop-types'
import React from 'react'
import { TouchableOpacity, View, UIManager, findNodeHandle, NativeEventEmitter } from 'react-native'

function noop() {}

class TreeView extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    renderNode: PropTypes.func.isRequired,
    initialExpanded: PropTypes.bool,
    getCollapsedNodeHeight: PropTypes.func,
    idKey: PropTypes.string,
    childrenKey: PropTypes.string,
    onNodePress: PropTypes.func,
    onNodeLongPress: PropTypes.func,
    isNodeExpanded: PropTypes.func
  }

  static defaultProps = {
    initialExpanded: false,
    getCollapsedNodeHeight: () => 20,
    idKey: 'id',
    childrenKey: 'children',
    onNodePress: noop,
    onNodeLongPress: noop,
    isNodeExpanded: noop
    }

  constructor(props) {
    super(props)

    this.state = this.getInitialState()
  }

  getInitialState = () => ({
    expandedNodeKeys: {},
    pNode: '',
    cNode: '',
    click_x: 0,
    measurement:{},
  })

  componentDidUpdate(prevProps) {
    const hasDataUpdated = prevProps.data !== this.props.data
    const hasIdKeyUpdated = prevProps.idKey !== this.props.idKey
    const childrenKeyUpdated = prevProps.childrenKey !== this.props.childrenKey

    if (hasDataUpdated || hasIdKeyUpdated || childrenKeyUpdated) {
      this.setState(this.getInitialState())
    }
  }

  hasChildrenNodes = (node) =>
    get(node, `${this.props.childrenKey}.length`, 0) > 0

  isExpanded = (id) => {
    if (this.props.isNodeExpanded !== noop) {
      return this.props.isNodeExpanded(id)
    } else {
        return get(this.state.expandedNodeKeys, id, this.props.initialExpanded)
    }
  }

  updateNodeKeyById = (id, expanded) => ({ expandedNodeKeys }) => ({
    expandedNodeKeys: Object.assign({}, expandedNodeKeys, {
      [id]: expanded,
    }),
  })

  collapseNode = (id) => this.setState(this.updateNodeKeyById(id, false))

  expandNode = (id) => this.setState(this.updateNodeKeyById(id, true))

  toggleCollapse = (id) => {
    const method = this.isExpanded(id) ? 'collapseNode' : 'expandNode'

    this[method](id)
  }

  handleNodePressed = async ({ node, level }) => {
    console.log('aaaa')
    let prestate = this.state;
   
    if (node.id.length == 4) {
      console.log('i clicked pnode!');
      if (prestate.pNode != '') {
        console.log('Old pnode is here.');
        if (prestate.pNode == node.id) {
          //close this pNode
          if (prestate.cNode != '') {
            console.log('Old cnode is here.');
            this.collapseNode(prestate.cNode);
            prestate.cNode = '';
          }
          prestate.pNode = '';
        } else {
          //open new pNode
          if (prestate.cNode != '') {
            console.log('Old cnode is here.');
            this.collapseNode(prestate.cNode);
            prestate.cNode = '';
          }
          //old pNode close!!!
          this.collapseNode(prestate.pNode);
          prestate.pNode = node.id;  
        }
      } else {
        // no pnode clicked
        prestate.pNode = node.id;
      } 
    } else {
      console.log('i clicked cnode!');
      if (prestate.cNode != '') {
        console.log('Old cnode is here.');
        if (prestate.cNode == node.id) {
          //close this cnode
          prestate.cNode = '';
        } else {
          //open new cnode
          
          this.collapseNode(prestate.cNode);
          
          prestate.cNode = node.id;
        }
      } else {
        console.log('new cnode open');
        prestate.cNode = node.id;
      }
    }
  
    this.setState({
      pNode: prestate.pNode,
      cNode: prestate.cNode,
    });
    
    const nodePressResult = await this.props.onNodePress({ node, level })

    if (nodePressResult !== false && this.hasChildrenNodes(node)) {
      this.toggleCollapse(node[this.props.idKey])
    }

   // if (this.isExpanded(node.id))
    {
   
        
      node.ref.measure((fx, fy, width, height, px, py)=>{
    
        this.setState({
          click_x:py
            }, () => this.props.moveToPos(this.state.click_x))
        })

       
    }
  }

  Tree = ({ nodes, level }) => {
    return nodes.map((node) => {
      const isExpanded = this.isExpanded(node[this.props.idKey])
      const hasChildrenNodes = this.hasChildrenNodes(node)
      const shouldRenderLevel = hasChildrenNodes && isExpanded

      return (
        <View
       
          key={node[this.props.idKey]}
          style={{
            // height: isExpanded
            //   ? 'auto'
            //   : this.props.getCollapsedNodeHeight({
            //       [this.props.idKey]: node[this.props.idKey],
            //       level,
            //   }),
            height:'auto',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            
            // this.button1 = view;
            ref ={view => { node.ref = view; }}
            onPress={() => this.handleNodePressed({ node, level })}
            onLongPress={() => this.props.onNodeLongPress({ node, level })}
          >
          
            {React.createElement(this.props.renderNode, {
              node,
              level,
              isExpanded,
              hasChildrenNodes,
              
            })}
          </TouchableOpacity>
          {shouldRenderLevel && (
            <this.Tree nodes={node[this.props.childrenKey]} level={level + 1} />
          )}
        </View>
      )
    })
  }

  render() {
    return <this.Tree nodes={this.props.data} level={0} />
  }
}

export default TreeView;

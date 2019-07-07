import React, { Component } from 'react';
import classes from './TabsManager.module.css';

class TabsManager extends Component {
    state = {
      activeTab: 0
    }
    
    toggleTab = (tab) => {
      if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    render() {
        let navItems = null;
        let tabPanes = null;

        navItems = this.props.children.map((child, index) => {
          if (child.type.name !== 'TabItem') {
            console.log("Warning TabsManager has children that aren't TabItem(s) components");
            return null;
          } else {
            let linkClasses = ["nav-item","nav-link"];
            if (this.state.activeTab === index) {
              linkClasses.push("active");
            }

            return (
              <a key={index}
                className={linkClasses.join(' ')}
                id={"nav-" + child.props.tabId + "-tab"} 
                data-toggle="tab" 
                href={"#nav-" + child.props.tabId} 
                role="tab" 
                aria-controls={"nav-" + child.props.tabId} 
                aria-selected={this.state.activeTab === index ? "true" : "false" }
                onClick={() => { this.toggleTab(index); }}
                >{child.props.tabName}</a>
            );
          }
        });

        tabPanes = React.Children.map(this.props.children, (child, index) => {
          if (child.type.name !== 'TabItem') {
            console.log("Warning TabsManager has children that aren't TabItem(s) components");
          } else {
            let tabClasses = ["tab-pane","fade"];
            if (this.state.activeTab === index) {
              tabClasses.push("show");
              tabClasses.push("active");
            }

            return (
              <div key={index} 
                   className={tabClasses.join(' ')}
                   id={child.props.tabId} 
                   role="tabpanel" 
                   aria-labelledby={child.props.tabId + "-tab"} 
                   style={{height: '100%'}}>
                {React.cloneElement(child, { isActive: this.state.activeTab === index })}
              </div>
            );
          }
        });

        return (
            <div className={classes.TabsBox}>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {navItems}
                  </div>
                </nav>
                <div className="tab-content" style={{height: 'calc(100% - 41px)'}}>
                  {tabPanes}
                </div>
            </div>
        );
    }
}

export default TabsManager;
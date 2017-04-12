import React, { Component } from "react";
import shallowCompare from "react-addons-shallow-compare";

export default class CategoryHeader extends Component {
  static propTypes = {
    category: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired
    }).isRequired,
    headingDecoration: React.PropTypes.node,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { category, headingDecoration, style } = this.props;

    return (
      <div className="emoji-category-header" style={style}>
        <h2 className="emoji-category-title">
          {category.title}
        </h2>
        <div className="emoji-category-heading-decoration">
          {headingDecoration}
        </div>
      </div>
    );
  }
}

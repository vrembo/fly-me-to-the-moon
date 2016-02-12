import React from 'react';
import Markdown from './react-markdown.js';
import Image from './react-image.js';
import Gallery from './react-gallery.js';
import YouTube from './react-youtube.js';

export default class PageContent extends React.Component {
	constructor() {
		super();

		this.renderElement = this.renderElement.bind(this);
		this.recurseElements = this.recurseElements.bind(this);
	}

	renderElement(item) {
		var components = {
			'Markdown': Markdown,
			'Image': Image,
			'Gallery': Gallery,
			'YouTube': YouTube
		};

		return React.createElement(components[item.type], item);
	}

	recurseElements(item) {
		return (Object.prototype.toString.call(item) === '[object Array]')
			? item.map(this.recurseElements)
			: this.renderElement(item);
	}

	render() {
		var content = [];

		for (var i = 0; i < Object.keys(this.props).length; i++) {
			content.push(this.recurseElements(this.props[i]));
		}

		return React.createElement("div", { id: "content" }, content)
	}
}
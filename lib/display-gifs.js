export default (urls) => {
	var elem = document.querySelector('#gifs')
	//console.log('display-gifs', elem)
	elem.innerHTML = urls.map(url => `<img src ="${url}">`).join('\n')
}
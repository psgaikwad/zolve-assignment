export default {
    getData: (callback) => {
      fetch('https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow')
			.then(resp => resp.json())
			.then((data) => callback(data))
    },
}

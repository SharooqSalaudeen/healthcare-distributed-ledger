(function () {
	// Connect to IPFS Node
	let NODE = IpfsApi(`${location.hostname}`, 5001);

	let IPFS = {
		// COMBAK
		async putFile (arrbuff, progresscallback) {
			progresscallback = (typeof progresscallback === "function") ? progresscallback : function () {};
			let data;
			if (arrbuff instanceof Array) {
				data = arrbuff.map(n => {
					return {
						path: n.path,
						content: buffer.Buffer.from(n.content)
					};
				});
			}
			else {
				data = buffer.Buffer.from(arrbuff);
			}
			let res = await NODE.add(data, {
				progress: progresscallback,
				recursive: true,
				pin: true
			});
			return res;
		},
		async getFile (hash) {
			let data = await NODE.get(hash);
			data = data[0].content;
			return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
		}
	};

	window.IPFSUtils = IPFS;
})();
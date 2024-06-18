import {Analitics}  from './analitics'

let inited = false

export const GTM = {
  dataScript: function (dataLayer) {
    const script = document.createElement('script')
    script.innerHTML = dataLayer
    return script
  },
  gtm: function (args) {
    const snippets = Analitics.gtmTags(args)

    const noScript = () => {
      const noscript = document.createElement('noscript')
      noscript.innerHTML = snippets.iframe
      return noscript
    }

    const script = () => {
      const script = document.createElement('script')
      script.innerHTML = snippets.script
      return script
    }

    const dataScript = this.dataScript(snippets.dataLayerVar)

    return {
      noScript,
      script,
      dataScript
    }
  },
  init: function ({ gtmId, dataLayer, dataLayerName = 'dataLayer'}) {
    if(inited) {
      return
    }
    const gtm = this.gtm({
      id: gtmId,
      dataLayer: dataLayer || undefined,
      dataLayerName: dataLayerName
    })
    if (dataLayer) document.head.appendChild(gtm.dataScript)
    document.head.insertBefore(gtm.script(), document.head.childNodes[0])
    document.body.insertBefore(gtm.noScript(), document.body.childNodes[0])
    inited = true
  },
  dataLayer: function ({dataLayer, dataLayerName = 'dataLayer'}) {
    const snippets = Analitics.dataLayer(dataLayer, dataLayerName)
    const dataScript = this.dataScript(snippets)
    document.head.appendChild(dataScript)
  },
  pushEvent: function (event) {
    window.dataLayer.push(event)
  }
}

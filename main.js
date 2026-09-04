window.onload = () => {
  const uploader = document.getElementById("uploader")
  const downloadButton = document.getElementById("download")
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  
  //----------------------------------------
  uploader.onchange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    
    reader.onload = e => {
      const img = new Image()
  
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        crop(0, 0, Math.ceil(img.width * 0.2), img.height)
      }
  
      img.src = e.target.result
    }
  
    reader.readAsDataURL(file)
  }
  
  //----------------------------------------
  downloadButton.onclick = () => {
    download()
  }

  //----------------------------------------
  const crop = (x, y, width, height) => {
    const temp = document.createElement("canvas")
    const tctx = temp.getContext("2d")
    temp.width = width
    temp.height = height
    tctx.drawImage(canvas, x, y, width, height, 0, 0, width, height)
    canvas.width = width
    canvas.height = height
    ctx.drawImage(temp, 0, 0)
  }

  //----------------------------------------
  const download = (format = "image/png") => {
    const link = document.createElement("a")
    link.download = "output." + format.split("/")[1]
    link.href = canvas.toDataURL(format)
    link.click()
  }
}

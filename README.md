# "映像" 乌托邦

## 技术路线

1. 首先通过在 `kaggle` 上下载数据集：[kaggle-world-gdp](https://www.kaggle.com/datasets/zgrcemta/world-gdpgdp-gdp-per-capita-and-annual-growths)、[kaggle-world-happiness](https://www.kaggle.com/datasets/usamabuttar/world-happiness-report-2005-present)。由于我们需要国家边界线的`Geojson`数据，于是我们在[World GeoJSON](https://github.com/Surbowl/world-geo-json-zh) 上下载了此数据。此外，由于 `kaggle` 数据集中国家名称为英文，因此我们还引入了 `echarts` 中的一份含中英文与国旗的 `json` 文件：[country-emoji-flags](https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json)

2. 数据处理与清洗部分

   1. 对于 `GDP` 部分，我们使用 `pandas` 对 `.csv` 进行读入处理，并读取了 `country-emoji-flags` 此 `json` 文件用以替换国家名称。在这里我们对数据进行了清洗，由于此数据如果进行插值填充，会导致数据的变化率不可信，因此我们选择直接去除所有缺省值。随后，我们选择年份为 `2000` 之后的数据，将此数据图与后续的幸福指数进行关联。我们对选择后的数据进行遍历，并构造出所需要的 `json` 数据，其格式为：

      ```json
      [
          ["id","gdp","country","year"],
          [0,1873452514,"Aruba",2000]
      ]
      ```

   2. 对于幸福指数部分，由于我们设计为用户可查看每一年中不同国家的幸福指数，并且需要为图层添加类热力图部分来增加对比感。因此这里 我们引入了 `GeoJson`，对每个国家，我们在其 `properties` 中为其设置中文名称，并为其添加了国家中心的经纬度，并添加其当前年份的 `happiness` 值，从而构造出我们需要的 `Json` 文件，其格式为：

      ```json
      {
          "type": "FeatureCollection", 
          "features": [
              {
                  "type": "Feature", 
                  "properties": {
                      "name": "斐济", 
                      "full_name": "斐济共和国", 
                      "iso_a2": "FJ", 
                      "iso_a3": "FJI",
                      "iso_n3": "242"
                  },
                  "geometry": {
                      "type": "MultiPolygon",
                      "coordinates": [[[[180.0, -16.06713], [180.0, -16.55522], [179.36414, -16.80135], [178.72506, -17.01204], [178.59684, -16.63915], [179.09661, -16.43398], [179.41351, -16.37905], [180.0, -16.06713]]], [[[178.12557, -17.50481], [178.3736, -17.33992], [178.71806, -17.62846], [178.55271, -18.15059], [177.93266, -18.28799], [177.38146, -18.16432], [177.28504, -17.72465], [177.67087, -17.38114], [178.12557, -17.50481]]], [[[-179.79332, -16.02088], [-179.91737, -16.50178], [-180.0, -16.55522], [-180.0, -16.06713], [-179.79332, -16.02088]]]]
                  }
              },
      ```

      当然，在此处我们也做了与 `GDP` 类似的数据清洗，即将缺省值删除。

3. 前端部分，我们采用了原生的 `HTML & CSS & JavaScript` 进行开发，并且使用 `CDN` 引入了所需要的开源组件进行可视化。首先我们使用 `HTML & CSS` 对网页 `UI` 进行设计搭建，随后在 `JavaScript` 中使用 `echart` ， `AntVl7` 等组件进行数据更新与图表的绘制

4. 最后，我们将此可视化项目通过 `Flask` 框架部署到了腾讯云的服务器上，使得用户能够直接通过 `ip` 地址进行访问，而不需要将项目下载到本地进行构建查看。


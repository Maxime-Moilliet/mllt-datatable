# mllt-datatable

> Datatable component

[![NPM](https://img.shields.io/npm/v/mllt-datatable.svg)](https://www.npmjs.com/package/mllt-datatable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Dependencies
   - yarn or npm,
   - react,
   - react-dom,
   - prop-types

## Install

```bash
npm install --save mllt-datatable
yarn add --save mllt-datatable
```

## Usage

```jsx
import React, { Component } from 'react'

import DataTable from 'mllt-datatable'
import 'mllt-datatable/dist/index.css'

const labels = [
  { label: 'Name', sortKey: 'name' },
  { label: 'Email', sortKey: 'email' }
]

const data = [
  {
    'name': 'John',
    'email': 'johndoe@email.com'
  },
  {
    'name': 'Mike',
    'email': 'mikefritz@email.com'
  },
  {
    'name': 'June',
    'email': 'junedaily@email.com'
  }
]


class Example extends Component {
  render() {
    return <DataTable labels={labels} data={data} itemsPerPage={2} />
  }
}
```

## License

MIT © [maxime_mllt](https://github.com/maxime_mllt)


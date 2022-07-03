# 🪠 Delete Property

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/survivorbat/delete-property/deploy)
![npm](https://img.shields.io/npm/dt/delete-property)
![GitHub](https://img.shields.io/github/license/survivorbat/delete-property)

Small utility to remove a property from a complex object using strings.

## ⬇️ Installation

`npm i delete-property`

## 📋 Usage

```typescript
const object = {
  foo: 'bar',
  bar: {
    baz: 'lorem ipsum',
  },
};

const result = deleteProperties(object, 'bar.baz');

// This will output { foo: 'bar' }
console.log(result);
```

## 🔭 Plans

Not much yet

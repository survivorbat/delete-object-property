# 🪠 Delete Object Property

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/survivorbat/delete-object-property/deploy)
![npm](https://img.shields.io/npm/dt/delete-object-property)
![GitHub](https://img.shields.io/github/license/survivorbat/delete-object-property)

Small utility to remove a property from a complex object using strings.
Several other packages already exist for this purpose, but I wanted my own :)

## ⬇️ Installation

`npm i delete-object-property`

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

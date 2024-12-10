import { z } from "zod"

export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg
  }

/**
 * @copyright https://gist.github.com/ghinda/8442a57f22099bdb2e34
 */
export function objectToFormData(
  obj: any,
  form?: FormData,
  namespace?: string,
) {
  const fd = form || new FormData()
  let formKey

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + "[" + property + "]"
      } else {
        formKey = property
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property)
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property])
      }
    }
  }

  return fd
}

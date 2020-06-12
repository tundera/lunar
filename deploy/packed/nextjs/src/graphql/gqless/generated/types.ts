import * as extensions from '../extensions';
import {
  TypeData,
  FieldsType,
  FieldsTypeArg,
  ScalarType,
  EnumType,
} from 'gqless';

type Extension<TName extends string> = TName extends keyof typeof extensions
  ? typeof extensions[TName]
  : any;

/**
 * @name Query
 * @type OBJECT
 */
type t_Query = FieldsType<
  {
    __typename: t_String<'Query'>;
    continents: FieldsTypeArg<
      { filter?: ContinentFilterInput | null },
      t_Continent[]
    >;
    continent?: FieldsTypeArg<{ code: string }, t_Continent | null>;
    countries: FieldsTypeArg<
      { filter?: CountryFilterInput | null },
      t_Country[]
    >;
    country?: FieldsTypeArg<{ code: string }, t_Country | null>;
    languages: FieldsTypeArg<
      { filter?: LanguageFilterInput | null },
      t_Language[]
    >;
    language?: FieldsTypeArg<{ code: string }, t_Language | null>;
  },
  Extension<'Query'>
>;

/**
 * @name ContinentFilterInput
 * @type INPUT_OBJECT
 */
export type ContinentFilterInput = { code?: StringQueryOperatorInput | null };

/**
 * @name StringQueryOperatorInput
 * @type INPUT_OBJECT
 */
export type StringQueryOperatorInput = {
  eq?: string | null;
  ne?: string | null;
  in?: (string | null)[] | null;
  nin?: (string | null)[] | null;
  regex?: string | null;
  glob?: string | null;
};

/**
 * @name String
 * @type SCALAR
 */
type t_String<T extends string = string> = ScalarType<T, Extension<'String'>>;

/**
 * @name Continent
 * @type OBJECT
 */
type t_Continent = FieldsType<
  {
    __typename: t_String<'Continent'>;
    code: t_ID;
    name: t_String;
    countries: t_Country[];
  },
  Extension<'Continent'>
>;

/**
 * @name ID
 * @type SCALAR
 */
type t_ID<T extends string = string> = ScalarType<T, Extension<'ID'>>;

/**
 * @name Country
 * @type OBJECT
 */
type t_Country = FieldsType<
  {
    __typename: t_String<'Country'>;
    code: t_ID;
    name: t_String;
    native: t_String;
    phone: t_String;
    continent: t_Continent;
    capital?: t_String | null;
    currency?: t_String | null;
    languages: t_Language[];
    emoji: t_String;
    emojiU: t_String;
    states: t_State[];
  },
  Extension<'Country'>
>;

/**
 * @name Language
 * @type OBJECT
 */
type t_Language = FieldsType<
  {
    __typename: t_String<'Language'>;
    code: t_ID;
    name?: t_String | null;
    native?: t_String | null;
    rtl: t_Boolean;
  },
  Extension<'Language'>
>;

/**
 * @name Boolean
 * @type SCALAR
 */
type t_Boolean<T extends boolean = boolean> = ScalarType<
  T,
  Extension<'Boolean'>
>;

/**
 * @name State
 * @type OBJECT
 */
type t_State = FieldsType<
  {
    __typename: t_String<'State'>;
    code?: t_String | null;
    name: t_String;
    country: t_Country;
  },
  Extension<'State'>
>;

/**
 * @name CountryFilterInput
 * @type INPUT_OBJECT
 */
export type CountryFilterInput = {
  code?: StringQueryOperatorInput | null;
  currency?: StringQueryOperatorInput | null;
  continent?: StringQueryOperatorInput | null;
};

/**
 * @name LanguageFilterInput
 * @type INPUT_OBJECT
 */
export type LanguageFilterInput = { code?: StringQueryOperatorInput | null };

/**
 * @name __Schema
 * @type OBJECT
 */
type t___Schema = FieldsType<
  {
    __typename: t_String<'__Schema'>;

    /**
     * A list of all types supported by this server.
     */
    types: t___Type[];

    /**
     * The type that query operations will be rooted at.
     */
    queryType: t___Type;

    /**
     * If this server supports mutation, the type that mutation operations will be rooted at.
     */
    mutationType?: t___Type | null;

    /**
     * If this server support subscription, the type that subscription operations will be rooted at.
     */
    subscriptionType?: t___Type | null;

    /**
     * A list of all directives supported by this server.
     */
    directives: t___Directive[];
  },
  Extension<'__Schema'>
>;

/**
 * @name __Type
 * @type OBJECT
 */
type t___Type = FieldsType<
  {
    __typename: t_String<'__Type'>;
    kind: t___TypeKind;
    name?: t_String | null;
    description?: t_String | null;
    fields?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___Field[] | null
    >;
    interfaces?: t___Type[] | null;
    possibleTypes?: t___Type[] | null;
    enumValues?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___EnumValue[] | null
    >;
    inputFields?: t___InputValue[] | null;
    ofType?: t___Type | null;
  },
  Extension<'__Type'>
>;

/**
 * @name __TypeKind
 * @type ENUM
 */
type t___TypeKind = EnumType<
  | 'SCALAR'
  | 'OBJECT'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'NON_NULL'
>;

/**
 * @name __Field
 * @type OBJECT
 */
type t___Field = FieldsType<
  {
    __typename: t_String<'__Field'>;
    name: t_String;
    description?: t_String | null;
    args: t___InputValue[];
    type: t___Type;
    isDeprecated: t_Boolean;
    deprecationReason?: t_String | null;
  },
  Extension<'__Field'>
>;

/**
 * @name __InputValue
 * @type OBJECT
 */
type t___InputValue = FieldsType<
  {
    __typename: t_String<'__InputValue'>;
    name: t_String;
    description?: t_String | null;
    type: t___Type;

    /**
     * A GraphQL-formatted string representing the default value for this input value.
     */
    defaultValue?: t_String | null;
  },
  Extension<'__InputValue'>
>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
type t___EnumValue = FieldsType<
  {
    __typename: t_String<'__EnumValue'>;
    name: t_String;
    description?: t_String | null;
    isDeprecated: t_Boolean;
    deprecationReason?: t_String | null;
  },
  Extension<'__EnumValue'>
>;

/**
 * @name __Directive
 * @type OBJECT
 */
type t___Directive = FieldsType<
  {
    __typename: t_String<'__Directive'>;
    name: t_String;
    description?: t_String | null;
    locations: t___DirectiveLocation[];
    args: t___InputValue[];
  },
  Extension<'__Directive'>
>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
type t___DirectiveLocation = EnumType<
  | 'QUERY'
  | 'MUTATION'
  | 'SUBSCRIPTION'
  | 'FIELD'
  | 'FRAGMENT_DEFINITION'
  | 'FRAGMENT_SPREAD'
  | 'INLINE_FRAGMENT'
  | 'VARIABLE_DEFINITION'
  | 'SCHEMA'
  | 'SCALAR'
  | 'OBJECT'
  | 'FIELD_DEFINITION'
  | 'ARGUMENT_DEFINITION'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'ENUM_VALUE'
  | 'INPUT_OBJECT'
  | 'INPUT_FIELD_DEFINITION'
>;

/**
 * @name CacheControlScope
 * @type ENUM
 */
type t_CacheControlScope = EnumType<'PUBLIC' | 'PRIVATE'>;

/**
 * @name Upload
 * @type SCALAR
 */
type t_Upload<T extends any = any> = ScalarType<T, Extension<'Upload'>>;

/**
 * @name Int
 * @type SCALAR
 */
type t_Int<T extends number = number> = ScalarType<T, Extension<'Int'>>;

/**
 * @name Query
 * @type OBJECT
 */
export type Query = TypeData<t_Query>;

/**
 * @name String
 * @type SCALAR
 */
export type String = TypeData<t_String>;

/**
 * @name Continent
 * @type OBJECT
 */
export type Continent = TypeData<t_Continent>;

/**
 * @name ID
 * @type SCALAR
 */
export type ID = TypeData<t_ID>;

/**
 * @name Country
 * @type OBJECT
 */
export type Country = TypeData<t_Country>;

/**
 * @name Language
 * @type OBJECT
 */
export type Language = TypeData<t_Language>;

/**
 * @name Boolean
 * @type SCALAR
 */
export type Boolean = TypeData<t_Boolean>;

/**
 * @name State
 * @type OBJECT
 */
export type State = TypeData<t_State>;

/**
 * @name __Schema
 * @type OBJECT
 */
export type __Schema = TypeData<t___Schema>;

/**
 * @name __Type
 * @type OBJECT
 */
export type __Type = TypeData<t___Type>;

/**
 * @name __TypeKind
 * @type ENUM
 */
export type __TypeKind = TypeData<t___TypeKind>;

/**
 * @name __Field
 * @type OBJECT
 */
export type __Field = TypeData<t___Field>;

/**
 * @name __InputValue
 * @type OBJECT
 */
export type __InputValue = TypeData<t___InputValue>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
export type __EnumValue = TypeData<t___EnumValue>;

/**
 * @name __Directive
 * @type OBJECT
 */
export type __Directive = TypeData<t___Directive>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
export type __DirectiveLocation = TypeData<t___DirectiveLocation>;

/**
 * @name CacheControlScope
 * @type ENUM
 */
export type CacheControlScope = TypeData<t_CacheControlScope>;

/**
 * @name Upload
 * @type SCALAR
 */
export type Upload = TypeData<t_Upload>;

/**
 * @name Int
 * @type SCALAR
 */
export type Int = TypeData<t_Int>;

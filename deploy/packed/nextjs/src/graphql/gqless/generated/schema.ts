// @ts-nocheck
import * as extensions from '../extensions';
import { lazyGetters } from '@gqless/utils';
import {
  ObjectNode,
  FieldNode,
  ArrayNode,
  Arguments,
  ArgumentsField,
  InputNode,
  InputNodeField,
  ScalarNode,
  EnumNode,
} from 'gqless';

export const schema = {
  get Query() {
    return new ObjectNode(
      {
        get continents() {
          return new FieldNode(
            new ArrayNode(schema.Continent, false),
            new Arguments({
              get filter() {
                return new ArgumentsField(schema.ContinentFilterInput, true);
              },
            }),
            false,
          );
        },
        get continent() {
          return new FieldNode(
            schema.Continent,
            new Arguments(
              {
                get code() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true,
            ),
            true,
          );
        },
        get countries() {
          return new FieldNode(
            new ArrayNode(schema.Country, false),
            new Arguments({
              get filter() {
                return new ArgumentsField(schema.CountryFilterInput, true);
              },
            }),
            false,
          );
        },
        get country() {
          return new FieldNode(
            schema.Country,
            new Arguments(
              {
                get code() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true,
            ),
            true,
          );
        },
        get languages() {
          return new FieldNode(
            new ArrayNode(schema.Language, false),
            new Arguments({
              get filter() {
                return new ArgumentsField(schema.LanguageFilterInput, true);
              },
            }),
            false,
          );
        },
        get language() {
          return new FieldNode(
            schema.Language,
            new Arguments(
              {
                get code() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true,
            ),
            true,
          );
        },
      },
      { name: 'Query', extension: ((extensions as any) || {}).Query },
    );
  },
  get ContinentFilterInput() {
    return new InputNode(
      {
        get code() {
          return new InputNodeField(schema.StringQueryOperatorInput, true);
        },
      },
      { name: 'ContinentFilterInput' },
    );
  },
  get StringQueryOperatorInput() {
    return new InputNode(
      {
        get eq() {
          return new InputNodeField(schema.String, true);
        },
        get ne() {
          return new InputNodeField(schema.String, true);
        },
        get in() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get nin() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get regex() {
          return new InputNodeField(schema.String, true);
        },
        get glob() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: 'StringQueryOperatorInput' },
    );
  },
  get String() {
    return new ScalarNode({
      name: 'String',
      extension: ((extensions as any) || {}).String,
    });
  },
  get Continent() {
    return new ObjectNode(
      {
        get code() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get countries() {
          return new FieldNode(
            new ArrayNode(schema.Country, false),
            undefined,
            false,
          );
        },
      },
      { name: 'Continent', extension: ((extensions as any) || {}).Continent },
    );
  },
  get ID() {
    return new ScalarNode({
      name: 'ID',
      extension: ((extensions as any) || {}).ID,
    });
  },
  get Country() {
    return new ObjectNode(
      {
        get code() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get native() {
          return new FieldNode(schema.String, undefined, false);
        },
        get phone() {
          return new FieldNode(schema.String, undefined, false);
        },
        get continent() {
          return new FieldNode(schema.Continent, undefined, false);
        },
        get capital() {
          return new FieldNode(schema.String, undefined, true);
        },
        get currency() {
          return new FieldNode(schema.String, undefined, true);
        },
        get languages() {
          return new FieldNode(
            new ArrayNode(schema.Language, false),
            undefined,
            false,
          );
        },
        get emoji() {
          return new FieldNode(schema.String, undefined, false);
        },
        get emojiU() {
          return new FieldNode(schema.String, undefined, false);
        },
        get states() {
          return new FieldNode(
            new ArrayNode(schema.State, false),
            undefined,
            false,
          );
        },
      },
      { name: 'Country', extension: ((extensions as any) || {}).Country },
    );
  },
  get Language() {
    return new ObjectNode(
      {
        get code() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, true);
        },
        get native() {
          return new FieldNode(schema.String, undefined, true);
        },
        get rtl() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
      },
      { name: 'Language', extension: ((extensions as any) || {}).Language },
    );
  },
  get Boolean() {
    return new ScalarNode({
      name: 'Boolean',
      extension: ((extensions as any) || {}).Boolean,
    });
  },
  get State() {
    return new ObjectNode(
      {
        get code() {
          return new FieldNode(schema.String, undefined, true);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get country() {
          return new FieldNode(schema.Country, undefined, false);
        },
      },
      { name: 'State', extension: ((extensions as any) || {}).State },
    );
  },
  get CountryFilterInput() {
    return new InputNode(
      {
        get code() {
          return new InputNodeField(schema.StringQueryOperatorInput, true);
        },
        get currency() {
          return new InputNodeField(schema.StringQueryOperatorInput, true);
        },
        get continent() {
          return new InputNodeField(schema.StringQueryOperatorInput, true);
        },
      },
      { name: 'CountryFilterInput' },
    );
  },
  get LanguageFilterInput() {
    return new InputNode(
      {
        get code() {
          return new InputNodeField(schema.StringQueryOperatorInput, true);
        },
      },
      { name: 'LanguageFilterInput' },
    );
  },
  get __Schema() {
    return new ObjectNode(
      {
        get types() {
          return new FieldNode(
            new ArrayNode(schema.__Type, false),
            undefined,
            false,
          );
        },
        get queryType() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get mutationType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get subscriptionType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get directives() {
          return new FieldNode(
            new ArrayNode(schema.__Directive, false),
            undefined,
            false,
          );
        },
      },
      { name: '__Schema', extension: ((extensions as any) || {}).__Schema },
    );
  },
  get __Type() {
    return new ObjectNode(
      {
        get kind() {
          return new FieldNode(schema.__TypeKind, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get fields() {
          return new FieldNode(
            new ArrayNode(schema.__Field, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true,
          );
        },
        get interfaces() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true,
          );
        },
        get possibleTypes() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true,
          );
        },
        get enumValues() {
          return new FieldNode(
            new ArrayNode(schema.__EnumValue, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true,
          );
        },
        get inputFields() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, true),
            undefined,
            true,
          );
        },
        get ofType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
      },
      { name: '__Type', extension: ((extensions as any) || {}).__Type },
    );
  },
  get __TypeKind() {
    return new EnumNode({ name: '__TypeKind' });
  },
  get __Field() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false,
          );
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      { name: '__Field', extension: ((extensions as any) || {}).__Field },
    );
  },
  get __InputValue() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get defaultValue() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      {
        name: '__InputValue',
        extension: ((extensions as any) || {}).__InputValue,
      },
    );
  },
  get __EnumValue() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      {
        name: '__EnumValue',
        extension: ((extensions as any) || {}).__EnumValue,
      },
    );
  },
  get __Directive() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get locations() {
          return new FieldNode(
            new ArrayNode(schema.__DirectiveLocation, false),
            undefined,
            false,
          );
        },
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false,
          );
        },
      },
      {
        name: '__Directive',
        extension: ((extensions as any) || {}).__Directive,
      },
    );
  },
  get __DirectiveLocation() {
    return new EnumNode({ name: '__DirectiveLocation' });
  },
  get CacheControlScope() {
    return new EnumNode({ name: 'CacheControlScope' });
  },
  get Upload() {
    return new ScalarNode({
      name: 'Upload',
      extension: ((extensions as any) || {}).Upload,
    });
  },
  get Int() {
    return new ScalarNode({
      name: 'Int',
      extension: ((extensions as any) || {}).Int,
    });
  },
};

lazyGetters(schema);

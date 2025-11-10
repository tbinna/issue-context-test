import Resolver from '@forge/resolver';
import {requestJira, route} from "@forge/api";

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'Hello, world!';
});

export const handler = resolver.getDefinitions();

export const issueContextStatus = async (payload) => {
  console.log('Got payload', payload)
  const issueId = payload.extension.issue.id
  console.log('Extracted issueId', issueId)
  const response = await requestJira(
      route`/rest/api/3/issue/${issueId}/properties/test`
  )
  console.log('Got API response', response)
  const responsePayload = await response.json()
  console.log('Got responsePayload', responsePayload)
  return {
      status: {
        type: 'badge',
        value: {
          label: '42'
        }
      }
  }
}
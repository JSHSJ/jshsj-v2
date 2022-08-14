<script lang="ts">
  import Input from "./InputFields/Input.svelte";

  enum MatchType {
    TITLE = "title",
    HEADER = "header",
    CONTENT = "content",
  }

  type SearchMatch = {
    type: MatchType;
    match: string;
    link: string;
  };

  type SearchResult = {
    match: SearchMatch[];
    title: string;
    link: string;
  };

  type SearchContent = {
    title: string;
    description: string;
    link: string;
    headers: {
      depth: number;
      slug: string;
      text: string;
    }[];
    content: string;
  };

  export let filePath: string;

  let searchInput: string = "";
  let content: SearchContent[] = [];

  const intialiseQuery = () => {
    const search = new URLSearchParams(window?.location.search);
     
    if (search.has("search")) {
      searchInput = search.get("search") as string;
      searchResults = searchContent(searchInput);
    }
  }

  // initialise: read file
  const initialiseContent = (file: string) => {
    fetch(file)
      .then((res) => res.json())
      .then((json) => {
        content = json;
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        intialiseQuery()
      })
  };

  initialiseContent(filePath);

  const searchContent = (input: string): SearchResult[] => {
    const regex = new RegExp(
      `\\w{0,}[\\s\\-\\.\`]{0,3}${input}[\\s\\-\\.\`]{0,3}\\w{0,}`,
      "gmi"
    );
    return content
      .map((item) => {
        const matchesInHeaders = item.headers.map((headerItem) => {
          const match = headerItem.text.match(regex);
          if (match) {
            return {
              type: MatchType.HEADER,
              match: match[0],
              link: `${item.link}#${headerItem.slug}`,
            };
          }
        });

        const matchInTitle = item.title.match(regex);

        const titleMatch = matchInTitle
          ? {
              type: MatchType.TITLE,
              match: matchInTitle[0],
              link: item.link,
            }
          : null;

        const matchesInContent = item.content.matchAll(regex);

        const contentMatches = Array.from(matchesInContent).map((match) => {
          return {
            type: MatchType.CONTENT,
            match: match[0],
            link: item.link,
          };
        });

        if (titleMatch || matchesInHeaders.length || contentMatches.length) {
          return {
            match: [titleMatch, ...matchesInHeaders, ...contentMatches].filter(
              (item) => item
            ),
            title: item.title,
            link: item.link,
          };
        }
      })
      .filter((item) => item?.match?.length);
  };

  let searchResults: SearchResult[] = undefined;
</script>

{#if content.length === 0}
  <p>Initialising...</p>
{:else}
  <div class="stack -layout-xl">
    <form class="stack -layout-md">
      <Input
        name="search"
        label="Search"
        id="search"
        type="search"
        autocomplete="off"
        bind:value={searchInput}
      />
      <button
        class="CTA-button"
        style="max-width: max-content;"
        type="submit"
        on:click={(e) => {
          e.preventDefault();
          const searchParams = new URLSearchParams({
            search: searchInput,
          });
          window.history.pushState(null, "", `?${searchParams}`);
          searchResults = searchContent(searchInput);
        }}>Search</button
      >
    </form>
    {#if !searchResults}
      Start searching!
    {:else if searchResults?.length === 0}
      <p class="-medium">Nothing matches your search...</p>
    {:else}
      <p>Found <strong>{searchResults.length}</strong> pages.</p>
      <ul class="list-reset stack -layout-xl w-full">
        {#each searchResults as result}
          <li class="stack -layout-md">
            <a href={result.link}>
              <h2 class="search-title">Page: {result.title}</h2>
            </a>
            <ul class="stack -layout-sm list-reset search-results">
              {#each result.match.slice(0, 3) as match}
                <li>
                  {#if match.type === MatchType.TITLE}
                    <p class="badge typo-sm">Title matches</p>
                  {:else if match.type === MatchType.HEADER}
                    <a href={match.link} class="search-chapter"
                      ><strong>Chapter:</strong> {match.match}</a
                    >
                  {:else if match.type === MatchType.CONTENT}
                    <p class="typo-sm">...{match.match}...</p>
                  {/if}
                </li>
              {/each}
              {#if result.match.length > 3}
                <small class="search-results-more">...and {result.match.length - 3} more matches.</small>
              {/if}
            </ul>
          </li>
          <hr />
        {/each}
      </ul>
    {/if}
  </div>
{/if}

<style>
  .search-title {
    font-size: var(--font-size-base);
    font-family: var(--font-family-sans);
    --font-weight: var(--font-weight-medium);
  }

  .search-chapter {
    font-size: var(--font-size-sm);
    font-family: var(--font-family-sans);
    --font-weight: var(--font-weight-medium);
  }

  .search-results {
    margin-top: var(--spacing-sm);
  }

  .search-results-more {
    font-family: var(--font-family-mono);
  }
</style>

# GitHub Actions Triggers - Complete Guide

## 🎯 **Tu Caso Específico**

Para triggear en las ramas y tags que mencionaste:

```yaml
on:
  push:
    branches:
      - prd           # Rama exacta 'prd'
      - master        # Rama exacta 'master'  
      - main          # Rama exacta 'main'
      - 'prd-*'       # Cualquier rama que empiece con 'prd-'
    
    tags:
      - 'prd-*'       # Cualquier tag que empiece con 'prd-'
```

## 📋 **Triggers Principales**

### 1. **Push Events** 📤
```yaml
on:
  push:
    branches: [main, develop, 'feature/*']
    tags: ['v*', 'release-*']
    paths: ['src/**', '!docs/**']  # Include/exclude paths
```

### 2. **Pull Request Events** 🔀
```yaml
on:
  pull_request:
    types: [opened, synchronize, closed]
    branches: [main, develop]
```

### 3. **Manual Triggers** 👤
```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [dev, staging, prod]
      version:
        type: string
        default: 'latest'
```

### 4. **Scheduled Triggers** ⏰
```yaml
on:
  schedule:
    - cron: '0 9 * * 1-5'    # Monday-Friday 9 AM
    - cron: '0 0 * * 0'      # Sunday midnight
```

### 5. **Release Events** 🎉
```yaml
on:
  release:
    types: [published, created]
```

## 🔍 **Patrones Avanzados**

### **Branch Patterns**
```yaml
branches:
  - main                    # Exact match
  - 'feature/*'            # feature/anything
  - 'release/**'           # release/anything/nested
  - 'hotfix/[0-9]+'        # hotfix/123
  - '!draft/*'             # Exclude draft branches
```

### **Tag Patterns**
```yaml
tags:
  - 'v*'                   # v1.0.0, v2.1.3
  - 'v[0-9]+.[0-9]+.[0-9]+' # Semantic versions only
  - 'prd-*'                # prd-feature, prd-hotfix
  - '!*-alpha'             # Exclude alpha versions
```

### **Path Filters**
```yaml
paths:
  - 'src/**'               # Any file in src/
  - 'api/**.js'            # JS files in api/
  - 'package*.json'        # package.json, package-lock.json
  - '.github/workflows/**' # Workflow changes

paths-ignore:
  - 'docs/**'              # Ignore documentation
  - '*.md'                 # Ignore markdown files
  - 'tests/**'             # Ignore test files
```

## 🎯 **Conditional Logic**

### **Complex Conditions**
```yaml
jobs:
  deploy:
    if: |
      (github.event_name == 'push' && 
       startsWith(github.ref, 'refs/heads/prd')) ||
      (github.event_name == 'workflow_dispatch' && 
       github.event.inputs.environment == 'prod')
```

### **Branch-Specific Jobs**
```yaml
jobs:
  prod_deploy:
    if: |
      github.ref == 'refs/heads/prd' || 
      github.ref == 'refs/heads/master' ||
      startsWith(github.ref, 'refs/heads/prd-')
```

### **Tag-Based Jobs**
```yaml
jobs:
  release:
    if: |
      github.event_name == 'push' && 
      github.ref_type == 'tag' &&
      startsWith(github.ref_name, 'prd-')
```

## 📊 **Cron Schedule Examples**

| Schedule | Cron | Description |
|----------|------|-------------|
| Every 15 min | `*/15 * * * *` | Every quarter hour |
| Business hours | `0 9-17 * * 1-5` | 9 AM - 5 PM, Mon-Fri |
| Daily 2 AM | `0 2 * * *` | Every day at 2 AM |
| Weekly Sunday | `0 0 * * 0` | Sunday midnight |
| Monthly 1st | `0 3 1 * *` | 1st day of month, 3 AM |
| Quarterly | `0 6 1 */3 *` | Every 3 months |

## 🚀 **Context Variables**

### **Useful GitHub Context**
```yaml
${{ github.event_name }}          # push, pull_request, etc.
${{ github.ref }}                 # refs/heads/main
${{ github.ref_name }}            # main, prd-feature
${{ github.ref_type }}            # branch, tag
${{ github.actor }}               # Username who triggered
${{ github.repository }}          # owner/repo
${{ github.sha }}                 # Commit SHA
```

### **Input Access**
```yaml
${{ github.event.inputs.environment }}    # Manual input
${{ github.event.pull_request.number }}   # PR number
${{ github.event.release.tag_name }}      # Release tag
```

## 💡 **Best Practices**

### 1. **Use Specific Patterns**
```yaml
# ✅ Good - specific pattern
branches: ['prd-*', 'release/*']

# ❌ Avoid - too broad
branches: ['*']
```

### 2. **Combine Triggers Wisely**
```yaml
# ✅ Good - logical combination
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

### 3. **Use Path Filters**
```yaml
# ✅ Good - only run when relevant files change
on:
  push:
    paths: ['src/**', 'package.json']
```

### 4. **Conditional Jobs**
```yaml
# ✅ Good - conditional execution
jobs:
  deploy:
    if: startsWith(github.ref, 'refs/heads/prd')
```

## 🔧 **Testing Triggers**

### **Manual Testing**
1. Use `workflow_dispatch` for testing
2. Create test branches with your patterns
3. Push test tags to verify tag triggers

### **Debug Information**
```yaml
- name: Debug trigger
  run: |
    echo "Event: ${{ github.event_name }}"
    echo "Ref: ${{ github.ref }}"
    echo "Ref Name: ${{ github.ref_name }}"
    echo "Ref Type: ${{ github.ref_type }}"
```

## 📚 **Complete Example for Your Use Case**

```yaml
name: Production Pipeline

on:
  push:
    branches:
      - prd
      - master  
      - main
      - 'prd-*'
    tags:
      - 'prd-*'
    paths:
      - 'src/**'
      - 'package*.json'
      - 'Dockerfile'

jobs:
  determine_environment:
    runs-on: ubuntu-latest
    outputs:
      environment: ${{ steps.env.outputs.environment }}
    steps:
      - name: Determine environment
        id: env
        run: |
          if [[ "${{ github.ref_type }}" == "tag" ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
          elif [[ "${{ github.ref_name }}" == "prd" ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
          elif [[ "${{ github.ref_name }}" == "master" || "${{ github.ref_name }}" == "main" ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
          elif [[ "${{ github.ref_name }}" == prd-* ]]; then
            echo "environment=staging" >> $GITHUB_OUTPUT
          fi

  deploy:
    needs: determine_environment
    runs-on: ubuntu-latest
    environment: ${{ needs.determine_environment.outputs.environment }}
    steps:
      - name: Deploy
        run: |
          echo "Deploying to ${{ needs.determine_environment.outputs.environment }}"
          echo "Ref: ${{ github.ref_name }}"
          echo "Type: ${{ github.ref_type }}"
```

¡Con estos ejemplos tienes todo lo necesario para manejar cualquier trigger en GitHub Actions! 🎉